const MySQL = require('promise-mysql2');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || 'localhost',
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PASSWORD || 'password',
  database: process.env.MYSQL_CONFIG_DATABASE || 'phincon_academy_db',
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const phoneBookTable = process.env.PHONEBOOK_TABLE || 'phonebook';

const getListPhonebook = async () => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const [rawResult] = await connection.query(`SELECT * FROM ${phoneBookTable}`);
    const result = Object.values(JSON.parse(JSON.stringify(rawResult)));

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getListPhonebook', 'INFO'], {
      message: { timeTaken },
      result
    });

    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'getListPhonebook', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const addPhonebook = async (name, number) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `INSERT INTO ${phoneBookTable} (name, number) VALUES (?, ?)`;
    const values = [name, number];
    await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getListPhonebook', 'INFO'], {
      message: { timeTaken }
    });
  } catch (error) {
    CommonHelper.log(['Database', 'getListPhonebook', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const editPhonebook = async (id, name, number) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `UPDATE ${phoneBookTable} SET name = ?, number = ? WHERE id = ?`;
    const values = [name, number, id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getListPhonebook', 'INFO'], {
      message: { timeTaken }
    });
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'getListPhonebook', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deletePhonebook = async (id) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `DELETE FROM ${phoneBookTable} WHERE id = ?`;
    const values = [id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getListPhonebook', 'INFO'], {
      message: { timeTaken }
    });
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'getListPhonebook', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { getListPhonebook, addPhonebook, editPhonebook, deletePhonebook };
