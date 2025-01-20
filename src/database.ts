import sqlite3 from 'sqlite3';
import { promisify } from 'util';

// Create a new database instance
const db = new sqlite3.Database('database.sqlite');

// Promisify database methods
const runAsync = promisify(db.run.bind(db));
const allAsync = promisify(db.all.bind(db));
const getAsync = promisify(db.get.bind(db));

// Initialize database with tables
const initializeDatabase = async () => {
  const createShipTableQuery = `
    CREATE TABLE IF NOT EXISTS ship (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL
    )
  `;

  const populateShipTableQuery = `
    INSERT INTO ship
    SELECT *
    FROM (
      VALUES
        ('SS-001','Galactic Voyager','JFK'),
        ('SS-002','Star Hopper',     'JFK'),
        ('SS-003','Cosmic Cruiser',  'SFO')
    ) source_data
    WHERE NOT EXISTS (
      SELECT NULL
      FROM ship
    );
  `;


  const createLocationTableQuery = `
    CREATE TABLE IF NOT EXISTS location (
      location TEXT PRIMARY KEY,
      latitude DECIMAL(7,4) NOT NULL,
      longitude DECIMAL(7,4) NOT NULL
    )
  `;

  const populateLocationTableQuery = `
    INSERT INTO location
    SELECT *
    FROM (
      VALUES
        ('JFK',40.6413,-73.7781),
        ('SFO',37.6213,-122.3790),
        ('LAX',33.9416,-118.4085)
    ) source_data
    WHERE NOT EXISTS (
      SELECT NULL
      FROM location
    );
  `;


  const createTripTableQuery = `
    CREATE TABLE IF NOT EXISTS trip (
      tripId INTEGER PRIMARY KEY AUTOINCREMENT,
      departureLocationCode TEXT NOT NULL,
      destinationLocationCode TEXT NOT NULL,
      departureAt TEXT NOT NULL, -- ISO-8601 string
      arrivalAt TEXT NOT NULL,   -- ISO-8601 string
      spaceshipId TEXT NOT NULL,
      prevTripId INTEGER -- if this is not null, it means we need to fly the ship with no one on it to get it into the right location
    )
  `;

  //const populateTripTableQuery = `
  //  INSERT INTO trip
  //  SELECT *
  //  FROM (
  //    VALUES
  //      (0,'SFO','JFK','2024-12-31T00:00:00', '2025-01-01T00:00:00','SS-001'),
  //      (1,'SFO','JFK','2024-12-31T00:00:00', '2025-01-01T00:00:00','SS-002'),
  //      (2,'JFK','SFO','2024-12-31T00:00:00', '2025-01-01T00:00:00','SS-003')
  //  ) source_data
  //  WHERE NOT EXISTS (
  //    SELECT NULL
  //    FROM trip
  //  );
  //`;


  const createCurrentTimeTableQuery = `
    CREATE TABLE IF NOT EXISTS currentTime (
      time TEXT NOT NULL -- ISO-8601 string
    )
  `;

  const populateCurrentTimeTableQuery = `
    INSERT INTO currentTime
    SELECT *
    FROM (
      VALUES
        ('2025-01-01T00:00:00')
    ) source_data
    WHERE NOT EXISTS (
      SELECT NULL
      FROM currentTime
    );
  `;

  try {
    await runAsync(createShipTableQuery);
    await runAsync(populateShipTableQuery);
    await runAsync(createLocationTableQuery);
    await runAsync(populateLocationTableQuery);
    await runAsync(createTripTableQuery);
    //await runAsync(populateTripTableQuery);
    await runAsync(createCurrentTimeTableQuery);
    await runAsync(populateCurrentTimeTableQuery);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Database operations
export const dbOperations = {
  //// Create a new user
  //createUser: async (name: string, email: string) => {
  //  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  //  try {
  //    return await runAsync(query, [name, email]);
  //  } catch (error) {
  //    throw new Error(`Error creating user: ${error}`);
  //  }
  //},

  //// Get all users
  //getAllUsers: async () => {
  //  const query = 'SELECT * FROM users';
  //  try {
  //    return await allAsync(query);
  //  } catch (error) {
  //    throw new Error(`Error getting users: ${error}`);
  //  }
  //},


  // Get all ships
  getAllShips: async () => {
    const query = 'SELECT * FROM ship';
    try {
      return await allAsync(query);
    } catch (error) {
      throw new Error(`Error getting ships: ${error}`);
    }
  },

  // Get all trips
  getAllTrips: async () => {
    const query = 'SELECT * FROM trip';
    try {
      return await allAsync(query);
    } catch (error) {
      throw new Error(`Error getting trip: ${error}`);
    }
  },

  getAllLocations: async () => {
    const query = `SELECT * FROM location`;
    try {
      return await allAsync(query);
    } catch (error) {
      throw new Error(`Error getting location: ${error}`);
    }
  },

  getLocation: async (location: string) => {
    const query = `SELECT * FROM location WHERE location = '${location}'`;
    try {
      return (await allAsync(query))[0];
    } catch (error) {
      throw new Error(`Error getting location: ${error}`);
    }
  },

  // Book a trip
  bookTrip: async (start: string, end: string, departureTime: string) => {
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    try {
      return await runAsync(query, [name, email]);
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  },

  // Cancel a trip
  cancelTrip: async (id: number) => {
    const query = 'DELETE FROM users WHERE id = ?';
    try {
      return await runAsync(query, [id]);
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }
  
  //// Get user by ID
  //getUserById: async (id: number) => {
  //  const query = 'SELECT * FROM users WHERE id = ?';
  //  try {
  //    return await getAsync(query, [id]);
  //  } catch (error) {
  //    throw new Error(`Error getting user: ${error}`);
  //  }
  //},

  //// Update user
  //updateUser: async (id: number, name: string, email: string) => {
  //  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  //  try {
  //    return await runAsync(query, [name, email, id]);
  //  } catch (error) {
  //    throw new Error(`Error updating user: ${error}`);
  //  }
  //},

  //// Delete user
  //deleteUser: async (id: number) => {
  //  const query = 'DELETE FROM users WHERE id = ?';
  //  try {
  //    return await runAsync(query, [id]);
  //  } catch (error) {
  //    throw new Error(`Error deleting user: ${error}`);
  //  }
  //}
};

export { initializeDatabase };
