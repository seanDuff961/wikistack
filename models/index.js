const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

//hook
Page.beforeValidate((pageInstance) => {

  if (pageInstance.title === undefined || pageInstance.title === null) {
  pageInstance.slug =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  } else {
  pageInstance.slug = pageInstance.title.replace(/\s+/gi, '_').replace(/\W/g, '');
    }
  });


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = { Page, User, db };

