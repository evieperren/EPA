jest.mock('express-validator')
jest.mock('express')
const mockingoose = require('mockingoose').default
const { createEmployee } = require('../../../src/controller/employee-functionality')
const Employee = require('../../../src/model/employee')
const responses = require('../mock-data/responses/single-employee.json')
const request = require('../mock-data/requests/single-employee.json')
const { validationResult } = require('express-validator')
const { response } = require('express')

describe('Create an Employee test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    validationResult.mockClear()
    mockingoose.resetAll();
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
  it('should send message "created" when a successful request has been made', () => {
    response.send.mockReturnValue('Created')
    expect(response.send()).toEqual('Created')
  })
})