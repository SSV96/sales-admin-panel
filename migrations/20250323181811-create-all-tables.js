module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Wholesalers Table
    await queryInterface.createTable('Wholesalers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create Retailers Table
    await queryInterface.createTable('Retailers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create Wholesaler-Retailer Relationship Table
    await queryInterface.createTable('WholesalerRetailers', {
      wholesaler_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Wholesalers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      retailer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Retailers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create Stocks Table
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      wholesaler_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Wholesalers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      retailer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Retailers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      stock_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Stocks');
    await queryInterface.dropTable('WholesalerRetailers');
    await queryInterface.dropTable('Retailers');
    await queryInterface.dropTable('Wholesalers');
  },
};
