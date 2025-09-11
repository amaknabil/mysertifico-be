"use strict";
const { v4: uuidv4 } = require('uuid');

const MYSERTIFICO_APP_ID = "4a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d";
const MYWALL_APP_ID = "5b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e";

//mysertifico plan
const ms_my_1 = "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6";
const ms_my_2 = "b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7";
const ms_my_3 = "c3d4e5f6-a7b8-c9d0-e1f2a3b4c5d6e7f8";

const ms_id_1 = "d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8a1";
const ms_id_2 = "e5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8a1b2";
const ms_id_3 = "f6a7b8c9-d0e1-f2a3-b4c5-d6e7f8a1b2c3";

const ms_sg_1 = "a7b8c9d0-e1f2-a3b4-c5d6-e7f8a1b2c3d4";
const ms_sg_2 = "b8c9d0e1-f2a3-b4c5-d6e7-f8a1b2c3d4e5";
const ms_sg_3 = "c9d0e1f2-a3b4-c5d6-e7f8-a1b2c3d4e5f6";

const ms_bn_1 = "d0e1f2a3-b4c5-d6e7-f8a1-b2c3d4e5f6a7";
const ms_bn_2 = "e1f2a3b4-c5d6-e7f8-a1b2-c3d4e5f6a7b8";
const ms_bn_3 = "f2a3b4c5-d6e7-f8a1-b2c3-d4e5f6a7b8c9";

const ms_au_1 = "a3b4c5d6-e7f8-a1b2-c3d4-e5f6a7b8c9d0";
const ms_au_2 = "b4c5d6e7-f8a1-b2c3-d4e5-f6a7b8c9d0e1";
const ms_au_3 = "c5d6e7f8-a1b2-c3d4-e5f6-a7b8c9d0e1f2";

//mywall plan
const mywall_my_1 = "d6e7f8a1-b2c3-d4e5-f6a7-b8c9d0e1f2a3";
const mywall_my_2 = "e7f8a1b2-c3d4-e5f6-a7b8-c9d0e1f2a3b4";
const mywall_my_3 = "f8a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5";

const mywall_id_1 = "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d7";
const mywall_id_2 = "b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e8";
const mywall_id_3 = "c3d4e5f6-a7b8-c9d0-e1f2a3b4c5d6e7f9";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("plans", [

      //for my sertifico plan
      // Malaysia
      {
        plan_id: ms_my_1,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Basic Pack",
        price: 50,
        price_pertoken: 0.15,
        subscription: false,
        token_allocation: 333,
        status: true,
        country_code: "MY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_my_2,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Value Pack",
        price: 100,
        price_pertoken: 0.13,
        subscription: false,
        token_allocation: 769,
        status: true,
        country_code: "MY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_my_3,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Mega Pack",
        price: 200,
        price_pertoken: 0.1,
        subscription: false,
        token_allocation: 2000,
        status: true,
        country_code: "MY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Indonesia
      {
        plan_id: ms_id_1,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Basic Pack",
        price: 192000,
        price_pertoken: 577,
        subscription: false,
        token_allocation: 333,
        status: true,
        country_code: "ID",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_id_2,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Value Pack",
        price: 383000,
        price_pertoken: 498,
        subscription: false,
        token_allocation: 769,
        status: true,
        country_code: "ID",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_id_3,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Mega Pack",
        price: 766000,
        price_pertoken: 383,
        subscription: false,
        token_allocation: 2000,
        status: true,
        country_code: "ID",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Singapore
      {
        plan_id: ms_sg_1,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Basic Pack",
        price: 15,
        price_pertoken: 0.045,
        subscription: false,
        token_allocation: 333,
        status: true,
        country_code: "SG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_sg_2,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Value Pack",
        price: 29,
        price_pertoken: 0.038,
        subscription: false,
        token_allocation: 769,
        status: true,
        country_code: "SG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_sg_3,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Mega Pack",
        price: 58,
        price_pertoken: 0.029,
        subscription: false,
        token_allocation: 2000,
        status: true,
        country_code: "SG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Brunei
      {
        plan_id: ms_bn_1,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Basic Pack",
        price: 15,
        price_pertoken: 0.045,
        subscription: false,
        token_allocation: 333,
        status: true,
        country_code: "BN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_bn_2,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Value Pack",
        price: 29,
        price_pertoken: 0.038,
        subscription: false,
        token_allocation: 769,
        status: true,
        country_code: "BN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_bn_3,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Mega Pack",
        price: 58,
        price_pertoken: 0.029,
        subscription: false,
        token_allocation: 2000,
        status: true,
        country_code: "BN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Australia
      {
        plan_id: ms_au_1,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Basic Pack",
        price: 16,
        price_pertoken: 0.048,
        subscription: false,
        token_allocation: 333,
        status: true,
        country_code: "AU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_au_2,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Value Pack",
        price: 32,
        price_pertoken: 0.042,
        subscription: false,
        token_allocation: 769,
        status: true,
        country_code: "AU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: ms_au_3,
        app_id: MYSERTIFICO_APP_ID,
        plan_name: "Mega Pack",
        price: 64,
        price_pertoken: 0.032,
        subscription: false,
        token_allocation: 2000,
        status: true,
        country_code: "AU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //for mywall
        //malaysia
      {
        plan_id: mywall_my_1,
        app_id: MYWALL_APP_ID,
        plan_name: "Standard Plan",
        price: 10,
        subscription: true,
        token_allocation: 25,
        status: true,
        country_code: "MY",
        createdAt: new Date(),
        updatedAt: new Date(),
        price_pertoken: 0
      },
      {
        plan_id: mywall_my_2,
        app_id: MYWALL_APP_ID,
        plan_name: "Premium Plan",
        price: 20,
        subscription: true,
        token_allocation: 100,
        status: true,
        country_code: "MY",
        createdAt: new Date(),
        updatedAt: new Date(),
        price_pertoken: 0
      },
      {
        plan_id: mywall_my_3,
        app_id: MYWALL_APP_ID,
        plan_name: "Basic Parent Plan",
        price: 30,
        subscription: true,
        token_allocation: 75,
        status: true,
        country_code: "MY",
        createdAt: new Date(),
        updatedAt: new Date(),
        price_pertoken: 0
      },

      //indonesia
      {
        plan_id: mywall_id_1,
        app_id: MYWALL_APP_ID,
        plan_name: "Standard Plan",
        price: 25000,
        subscription: true,
        token_allocation: 25,
        status: true,
        country_code: "ID",
        createdAt: new Date(),
        updatedAt: new Date(),
        price_pertoken: 0
      },
      {
        plan_id: mywall_id_2,
        app_id: MYWALL_APP_ID,
        plan_name: "Premium Plan",
        price: 50000,
        subscription: true,
        token_allocation: 100,
        status: true,
        country_code: "ID",
        createdAt: new Date(),
        updatedAt: new Date(),
        price_pertoken: 0
      },
      {
        plan_id: mywall_id_3,
        app_id: MYWALL_APP_ID,
        plan_name: "Basic Parent Plan",
        price: 150000,
        subscription: true,
        token_allocation: 75,
        status: true,
        country_code: "ID",
        createdAt: new Date(),
        updatedAt: new Date(),
        price_pertoken: 0
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("plans", null, {});
  },
};
