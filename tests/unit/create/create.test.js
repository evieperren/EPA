jest.mock('express-validator')
const mockingoose = require('mockingoose').default
const { createEmployee } = require('../../../src/controller/employee-functionality')
const Employee = require('../../../src/model/employee')
const responses = require('../mock-data/responses/single-employee.json')
const request = require('../mock-data/requests/single-employee.json')
const { validationResult } = require('express-validator')
const validationFail = require('../mock-data/responses/validation-fail.json')
const requestEmployeeValidationFail = require('../mock-data/requests/employee-validation-fail.json')

describe('Create an Employee test suite', () => {
  beforeEach(() => {
    validationResult.mockClear()
  })
  it('should be defined', () => {
    expect(createEmployee).toBeDefined()
  })
  it('should create an Employee from a request body with the correct name', async () => {
    mockingoose(Employee).toReturn(responses, 'save')
    const result = await Employee.create(request)
    expect(result.name).toEqual(responses.name)
  })
  it('should create an Employee from a request body with the correct contact details', async () => {
    mockingoose(Employee).toReturn(responses, 'save')
    const result = await Employee.create(request)
    expect(result.contactDetails).toEqual(responses.contactDetails)
  })
  it('should create an Employee from a request body with the correct employeeID', async () => {
    mockingoose(Employee).toReturn(responses, 'save')
    const result = await Employee.create(request)
    expect(result.employeeID).toEqual(responses.employeeID)
  })
  it('should create an Employee from a request body with the correct account balance', async () => {
    mockingoose(Employee).toReturn(responses, 'save')
    const result = await Employee.create(request)
    expect(result.accountBalance).toEqual(responses.accountBalance)
  })
  it('should throw an error if validation has failed', () => {
    validationResult.mockImplementation(() => {
      throw new Error
    })
    expect(validationResult).toThrow(new Error)
  })
})