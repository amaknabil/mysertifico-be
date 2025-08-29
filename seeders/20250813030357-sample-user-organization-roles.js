"use strict";


//1st group of mysertifico
const USER_SERTIFICO_SUPER_ADMIN_ID = '1e7d4b5a-2c8e-4f9e-a1b2-c3d4e5f6a7b8';
const USER_SERTIFICO_CREATOR_ID = '8ca44fcf-977d-4c57-bd5d-2d5d2dbef13d';
const USER_SERTIFICO_VERIFIER_ID = '843a5ce3-06f2-42ce-8a5a-d954a6c9793c';
const USER_SERTIFICO_SIGNATORY_ID = '47e8c247-64ad-4044-b976-ee6a445a6258';

//ORG ID
const ORG_SERTIFICO_ACADEMY_ID = "5c1b8f9e-6a2c-8d3a-e5f6-a7b8c9d0e1f2";

//ROLE IN ORG
const ROLE_SERTIFICO_SUPER_ADMIN_ID = '5f2c7a3d-4e9b-6c1f-a2b3-d4e5f6a7b8c9';
const ROLE_SERTIFICO_CREATOR_ID = '47e8c247-64ad-4044-b976-ee6a445a6258';
const ROLE_SERTIFICO_VERIFIER_ID = '76b52c86-bc63-4a15-8126-5c5d97d362ce';
const ROLE_SERTIFICO_SIGNATORY_ID = '425f3a7b-4ffd-4bd4-b6ff-98fc4f02d6e3';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "user_organization_roles",
      [
        {
          user_id: USER_SERTIFICO_SUPER_ADMIN_ID,
          organization_id: ORG_SERTIFICO_ACADEMY_ID,
          role_id: ROLE_SERTIFICO_SUPER_ADMIN_ID,
          is_active: true,
          assigned_at: new Date(),
        },
        {
          user_id: USER_SERTIFICO_CREATOR_ID,
          organization_id: ORG_SERTIFICO_ACADEMY_ID,
          role_id: ROLE_SERTIFICO_CREATOR_ID,
          is_active: true,
          assigned_at: new Date(),
        },
        {
          user_id: USER_SERTIFICO_VERIFIER_ID,
          organization_id: ORG_SERTIFICO_ACADEMY_ID,
          role_id: ROLE_SERTIFICO_VERIFIER_ID,
          is_active: true,
          assigned_at: new Date(),
        },
        {
          user_id: USER_SERTIFICO_SIGNATORY_ID,
          organization_id: ORG_SERTIFICO_ACADEMY_ID,
          role_id: ROLE_SERTIFICO_SIGNATORY_ID,
          is_active: true,
          assigned_at: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_organization_roles", null, {});
  },
};