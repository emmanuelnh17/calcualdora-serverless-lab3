'use strict';

module.exports.operaciones = async (event) => {
  try {
    // Parsear el cuerpo de la solicitud
    const body = JSON.parse(event.body);
    const { operacion, a, b } = body;

    // Validar que existan los parámetros
    if (!operacion || a === undefined || b === undefined) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Faltan parámetros. Se requiere: operacion, a, b'
        })
      };
    }

    let resultado;

    // Realizar la operación según el tipo
    switch (operacion.toLowerCase()) {
      case 'suma':
        resultado = a + b;
        break;
      case 'resta':
        resultado = a - b;
        break;
      case 'multiplicacion':
        resultado = a * b;
        break;
      case 'division':
        if (b === 0) {
          return {
            statusCode: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              error: 'No se puede dividir entre cero'
            })
          };
        }
        resultado = a / b;
        break;
      default:
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            error: 'Operación no válida. Use: suma, resta, multiplicacion, division'
          })
        };
    }

    // Retornar el resultado exitoso
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        operacion: operacion,
        a: a,
        b: b,
        resultado: resultado
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Error interno del servidor',
        detalle: error.message
      })
    };
  }
};

