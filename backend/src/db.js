const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const db = new Client({
  // PostgreSQL Client configuration
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || '172.20.0.2',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    port: process.env.DB_PORT || 5432,
})

const init = async () => {
  await db.connect();
}

// users
const userSetup = async (adminJson) => {
  await db.query(`
  CREATE TABLE IF NOT EXISTS public.users
    (
      id SERIAL NOT NULL,
      email text,
      password text,
      CONSTRAINT users_pkey PRIMARY KEY (id)
    );
    `);

  // Set the owner of the table to 'postgres'
  await db.query(`
  ALTER TABLE IF EXISTS public.stores OWNER to postgres;
`);

  // Insert data from adminJson if it's not already present
  for (const admin of adminJson) {
    // Check if the admin with the same gmail already exists
  const checkForUser = await db.query(`
    SELECT * FROM public.users
    WHERE
    email = $1
    LIMIT 1
  `, [admin.email]);

  console.log(checkForUser.rows);
  // If the admin doesn't exist, insert it into the 'users' table
    if (checkForUser.rows.length === 0) {
      const salt = await bcrypt.genSalt();
      admin.password = await bcrypt.hash(admin.password, salt)
      await db.query(`
        INSERT INTO public.users (email, password)
        VALUES ($1, $2)
      `, [admin.email, admin.password]);
    }
}

}

const getAllUsers = async() => {
  const res = await db.query('SELECT * FROM public.users');
  return res.rows;
}


//stores
const storeSetup = async (storeJson) => { // Create stores table if it doesn't exist
  //console.log('storeSetup')  
  await db.query(`
      CREATE TABLE IF NOT EXISTS public.stores
      (
          id SERIAL NOT NULL,
          name text,
          url text,
          district text,
          CONSTRAINT stores_pkey PRIMARY KEY (id)
      );
    `);

      // Set the owner of the table to 'postgres'
    await db.query(`
      ALTER TABLE IF EXISTS public.stores OWNER to postgres;
    `);
      // Insert data from storeJson if it's not already present
    for (const store of storeJson) {
          // Check if the store with the same name already exists
      const checkForStore = await db.query(`
        SELECT * FROM public.stores
        WHERE
        name = $1
        LIMIT 1
      `, [store.name]);

      console.log(checkForStore.rows);
    // If the store doesn't exist, insert it into the 'stores' table
      if (checkForStore.rows.length === 0) {
        await db.query(`
          INSERT INTO public.stores (name, url, district)
          VALUES ($1, $2, $3)
        `, [store.name, store.url, store.district]);
      }
    }
  }

  const getAllStores = async() => {
  const res = await db.query('SELECT * FROM public.stores');
  return res.rows;
}

const addStore = async(name, url, district) => {
  try {
    await db.query(`
      INSERT INTO public.stores (name, url, district)
      VALUES ($1, $2, $3)
    `, [name, url, district]);
    return {success: true, message: 'Store added successfully'}
  } catch(error) {
    return {success: false, message: error.message}
  }
}

const updateStoreById = async(id, name, url, district) => {
  try {
    await db.query(`
      UPDATE public.stores
      SET name = $1, url = $2, district = $3
      WHERE id = $4
    `, [name, url, district, id]);
    return {success: true, message: 'Store updated successfully'}
  } catch(error) {
    return {success: false, message: error.message}
  }
}

const delteStoreById = async (id) => {
  try {
    await db.query(`
    DELETE FROM public.stores
    WHERE id = $1
    `, [id]);
    return {success: true, message: "Store was successfully deleted"}
  } catch (error){
    return {success: false, message: error.message}
  }
}

const wellnessSetup = async (wellnessJson) => { // Create stores table if it doesn't exist
  await db.query(`
    CREATE TABLE IF NOT EXISTS public.wellness
    (
        id SERIAL NOT NULL,
        name text,
        url text,
        rating int,
        CONSTRAINT wellness_pkey PRIMARY KEY (id)
    );
  `);

    // Set the owner of the table to 'postgres'
  await db.query(`
    ALTER TABLE IF EXISTS public.wellness OWNER to postgres;
  `);
    // Insert data from storeJson if it's not already present
  for (const item of wellnessJson) {
        // Check if the store with the same name already exists
    const checkForService = await db.query(`
      SELECT * FROM public.wellness
      WHERE
      name = $1
      LIMIT 1
    `, [item.name]);

    console.log(checkForService.rows);
  // If the store doesn't exist, insert it into the 'stores' table
    if (checkForService.rows.length === 0) {
      await db.query(`
        INSERT INTO public.wellness (name, url, rating)
        VALUES ($1, $2, $3)
      `, [item.name, item.url, item.rating]);
    }
  }
}

const getAllWellness = async() => {
  const res = await db.query('SELECT * FROM public.wellness');
  return res.rows;
}

const addWellness = async(name, url, rating) => {
  try {
    await db.query(`
      INSERT INTO public.wellness (name, url, rating)
      VALUES ($1, $2, $3)
    `, [name, url, rating]);
    return {success: true, message: 'Wellness added successfully'}
  } catch(error) {
    return {success: false, message: error.message}
  }
}

const updateWellnessById = async (id,name,url,rating) =>{
  try {
    await db.query(`
      UPDATE public.wellness
      SET name = $1, url = $2, rating = $3
      WHERE id = $4
    `, [name, url, rating, id]);
    return {success: true, message: 'Wellness updated successfully'}
  } catch(error) {
    return {success: false, message: error.message}
  }

}

const deleteWellnessById = async (id) => {
  try {
    await db.query(`
    DELETE FROM public.wellness
    WHERE id = $1
    `, [id]);
    return {success: true, message: "Wellness deleted successfuly"}
  } catch(error) {
    return {success: false, message: error.message}
  }
}

module.exports = {
  init,
  userSetup,
  getAllUsers,
  storeSetup,
  getAllStores,
  addStore,
  updateStoreById,
  delteStoreById,
  wellnessSetup,
  getAllWellness,
  addWellness,
  updateWellnessById,
  deleteWellnessById
}