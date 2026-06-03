import { jest } from '@jest/globals';

// ─── Mock de Mongoose ─────────────────────────────────────────────────────────
// Se simula el modelo Usuario para que las pruebas no necesiten MongoDB.
jest.unstable_mockModule('../models/usuario.model.js', () => ({
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));

// Las importaciones dinámicas deben ir DESPUÉS del mock
const { default: app } = await import('../app.js');
const { default: Usuario } = await import('../models/usuario.model.js');
const { default: request } = await import('supertest');

// ─── Datos de prueba reutilizables ────────────────────────────────────────────
const usuarioValido = {
    _id: '64a1b2c3d4e5f6a7b8c9d0e1',
    nombre: 'Ana Torres',
    edad: 28,
    correo: 'ana@correo.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

// =============================================================================
// SUITE: POST /usuarios  –  Crear usuario
// =============================================================================
describe('POST /usuarios', () => {

    // ── Caso 1: Creación exitosa ───────────────────────────────────────────────
    describe('cuando los datos son válidos', () => {
        beforeEach(() => {
            // Simula que Usuario.create() resuelve con el usuario creado
            Usuario.create.mockResolvedValue(usuarioValido);
        });

        it('debe retornar 201 con el usuario creado', async () => {
            const res = await request(app)
                .post('/usuarios')
                .send({ nombre: 'Ana Torres', edad: 28, correo: 'ana@correo.com' });

            expect(res.statusCode).toBe(201);
            expect(res.body).toMatchObject({
                nombre: 'Ana Torres',
                edad: 28,
                correo: 'ana@correo.com',
            });
        });

        it('debe retornar un objeto con _id generado por Mongoose', async () => {
            const res = await request(app)
                .post('/usuarios')
                .send({ nombre: 'Ana Torres', edad: 28, correo: 'ana@correo.com' });

            expect(res.body).toHaveProperty('_id');
            expect(typeof res.body._id).toBe('string');
        });

        it('debe retornar Content-Type application/json', async () => {
            const res = await request(app)
                .post('/usuarios')
                .send({ nombre: 'Ana Torres', edad: 28, correo: 'ana@correo.com' });

            expect(res.headers['content-type']).toMatch(/application\/json/);
        });

        it('debe llamar a Usuario.create() exactamente una vez con los datos enviados', async () => {
            const body = { nombre: 'Ana Torres', edad: 28, correo: 'ana@correo.com' };

            await request(app).post('/usuarios').send(body);

            expect(Usuario.create).toHaveBeenCalledTimes(1);
            expect(Usuario.create).toHaveBeenCalledWith(body);
        });
    });

    // ── Caso 2: Fallo en la base de datos ─────────────────────────────────────
    describe('cuando ocurre un error en la base de datos', () => {
        beforeEach(() => {
            // Simula que Usuario.create() lanza un error (p. ej. correo duplicado)
            Usuario.create.mockRejectedValue(new Error('E11000 duplicate key'));
        });

        it('debe retornar 500 cuando Usuario.create() falla', async () => {
            const res = await request(app)
                .post('/usuarios')
                .send({ nombre: 'Ana Torres', edad: 28, correo: 'ana@correo.com' });

            expect(res.statusCode).toBe(500);
        });

        it('debe retornar un objeto con la propiedad "error"', async () => {
            const res = await request(app)
                .post('/usuarios')
                .send({ nombre: 'Ana Torres', edad: 28, correo: 'ana@correo.com' });

            expect(res.body).toHaveProperty('error');
            expect(res.body.error).toBe('Error al crear el usuario');
        });
    });

    afterEach(() => jest.clearAllMocks());
});

// =============================================================================
// SUITE: GET /usuarios  –  Obtener todos los usuarios
// =============================================================================
describe('GET /usuarios', () => {

    describe('cuando existen usuarios en la base de datos', () => {
        beforeEach(() => {
            Usuario.find.mockResolvedValue([usuarioValido]);
        });

        it('debe retornar 200 con un arreglo de usuarios', async () => {
            const res = await request(app).get('/usuarios');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toHaveLength(1);
        });

        it('debe incluir los campos del usuario en la respuesta', async () => {
            const res = await request(app).get('/usuarios');

            expect(res.body[0]).toMatchObject({
                nombre: 'Ana Torres',
                correo: 'ana@correo.com',
            });
        });
    });

    describe('cuando la base de datos está vacía', () => {
        beforeEach(() => {
            Usuario.find.mockResolvedValue([]);
        });

        it('debe retornar 200 con un arreglo vacío', async () => {
            const res = await request(app).get('/usuarios');

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
        });
    });

    describe('cuando ocurre un error en la base de datos', () => {
        beforeEach(() => {
            Usuario.find.mockRejectedValue(new Error('DB timeout'));
        });

        it('debe retornar 500 con el mensaje de error', async () => {
            const res = await request(app).get('/usuarios');

            expect(res.statusCode).toBe(500);
            expect(res.body).toHaveProperty('error', 'Error al obtener los usuarios');
        });
    });

    afterEach(() => jest.clearAllMocks());
});

// =============================================================================
// SUITE: GET /usuario/:id  –  Obtener usuario por ID
// =============================================================================
describe('GET /usuario/:id', () => {
    const ID_VALIDO = '64a1b2c3d4e5f6a7b8c9d0e1';

    describe('cuando el usuario existe', () => {
        beforeEach(() => {
            Usuario.findById.mockResolvedValue(usuarioValido);
        });

        it('debe retornar 200 con el usuario correspondiente', async () => {
            const res = await request(app).get(`/usuario/${ID_VALIDO}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject({ _id: ID_VALIDO });
        });
    });

    describe('cuando el usuario NO existe', () => {
        beforeEach(() => {
            Usuario.findById.mockResolvedValue(null);
        });

        it('debe retornar 404 con mensaje "Usuario no encontrado"', async () => {
            const res = await request(app).get(`/usuario/${ID_VALIDO}`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
        });
    });

    describe('cuando ocurre un error en la base de datos', () => {
        beforeEach(() => {
            Usuario.findById.mockRejectedValue(new Error('Cast error'));
        });

        it('debe retornar 500', async () => {
            const res = await request(app).get(`/usuario/${ID_VALIDO}`);
            expect(res.statusCode).toBe(500);
        });
    });

    afterEach(() => jest.clearAllMocks());
});

// =============================================================================
// SUITE: PUT /usuario/:id  –  Actualizar usuario
// =============================================================================
describe('PUT /usuario/:id', () => {
    const ID_VALIDO = '64a1b2c3d4e5f6a7b8c9d0e1';
    const usuarioActualizado = { ...usuarioValido, nombre: 'Ana Modificada' };

    describe('cuando el usuario existe y se actualiza correctamente', () => {
        beforeEach(() => {
            Usuario.findByIdAndUpdate.mockResolvedValue(usuarioValido);
            Usuario.findById.mockResolvedValue(usuarioActualizado);
        });

        it('debe retornar 200 con los datos ya actualizados', async () => {
            const res = await request(app)
                .put(`/usuario/${ID_VALIDO}`)
                .send({ nombre: 'Ana Modificada' });

            expect(res.statusCode).toBe(200);
            expect(res.body.nombre).toBe('Ana Modificada');
        });
    });

    describe('cuando el usuario NO existe', () => {
        beforeEach(() => {
            Usuario.findByIdAndUpdate.mockResolvedValue(null);
        });

        it('debe retornar 404', async () => {
            const res = await request(app)
                .put(`/usuario/${ID_VALIDO}`)
                .send({ nombre: 'Fantasma' });

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
        });
    });

    afterEach(() => jest.clearAllMocks());
});

// =============================================================================
// SUITE: DELETE /usuario/:id  –  Eliminar usuario
// =============================================================================
describe('DELETE /usuario/:id', () => {
    const ID_VALIDO = '64a1b2c3d4e5f6a7b8c9d0e1';

    describe('cuando el usuario existe', () => {
        beforeEach(() => {
            Usuario.findByIdAndDelete.mockResolvedValue(usuarioValido);
        });

        it('debe retornar 200 con mensaje de confirmación', async () => {
            const res = await request(app).delete(`/usuario/${ID_VALIDO}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Usuario eliminado');
        });
    });

    describe('cuando el usuario NO existe', () => {
        beforeEach(() => {
            Usuario.findByIdAndDelete.mockResolvedValue(null);
        });

        it('debe retornar 404', async () => {
            const res = await request(app).delete(`/usuario/${ID_VALIDO}`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
        });
    });

    describe('cuando ocurre un error en la base de datos', () => {
        beforeEach(() => {
            Usuario.findByIdAndDelete.mockRejectedValue(new Error('DB error'));
        });

        it('debe retornar 500', async () => {
            const res = await request(app).delete(`/usuario/${ID_VALIDO}`);
            expect(res.statusCode).toBe(500);
        });
    });

    afterEach(() => jest.clearAllMocks());
});