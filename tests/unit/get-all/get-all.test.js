jest.mock('express')
const { getAllEmployees } = require('../../../src/controller/employee-functionality')
const Employee = require('../../../src/model/employee')
const mockingoose = require('mockingoose').default
const arrayResponse = require('../mock-data/responses/array-employees.json')
const { response } = require('express')
const lowBalances = require('../mock-data/responses/low-balances.json')

describe('Get all Employees test suite', () => {
  it('should be defined', () => {
    expect(getAllEmployees).toBeDefined()
  })
  it('should return an array of employees', async () => {
    mockingoose(Employee).toReturn(arrayResponse, 'find')
    const results = await Employee.find()
    expect(results.length).toEqual(4)
  })
  it('should return error message when no employees are found', () => {
    response.send.mockReturnValue('Unable to be found. Please register for an account')
    expect(response.send()).toEqual('Unable to be found. Please register for an account')
  })
  it('should return employees with low balance', async () => {
    mockingoose(Employee).toReturn(lowBalances, 'find')
    const result = await Employee.find().where({accountBalance :{ $lte: 2.00}})
    expect(result.length).toEqual(6)
  })
  it('should return error message when no employees with less than £2.00 are found', () => {
    response.send.mockReturnValue('No Employee\'s with balance lower than £2.00')
    expect(response.send()).toEqual('No Employee\'s with balance lower than £2.00')
  })
})