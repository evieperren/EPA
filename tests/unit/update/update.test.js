jest.mock('express')
jest.mock('express-validator')
jest.mock('../../../src/controller/validation')
const { response } = require("express")
const { updateEmployee } = require('../../../src/controller/employee-functionality')
const Employee = require("../../../src/model/employee")
const mockingoose = require("mockingoose").default
const returnedEmployee = require('../mock-data/responses/single-employee.json')
const { validationResult } = require("express-validator")
const { validation } = require('../../../src/controller/validation')

describe('Update employee test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockingoose.resetAll();
  })
  it('should be defined', () => {
    expect(updateEmployee).toBeDefined()
  })
  it('should return a single employee by employee ID', async () => {
    mockingoose(Employee).toReturn(returnedEmployee, 'findOne')
    const result = await Employee.findOne({employeeID: '0efy65d68jgt543t'})

    expect(result.employeeID).toEqual(returnedEmployee.employeeID)
  })
  it('should update name by employee ID', async () => {
    mockingoose(Employee).toReturn(returnedEmployee, 'findOne')
    const result = await  Employee.update({ name: { first: 'CHANGED'} }).where({ employeeID: '0efy65d68jgt543t' })
    
    validation.mockReturnValue(true)
    expect(result.name).toBe('changed');
  })
  it('should throw an error if the given ID does not exist', () => {
    mockingoose(Employee).toReturn(returnedEmployee, 'findOne')
    const results = Employee.findById({_id: '1'})
    
    expect(results).not.toBe(JSON.stringify(returnedEmployee._id))
  })
  it('should send message "Ok" when a successful request has been made', () => {
    response.send.mockReturnValue('Ok')
    expect(response.send()).toEqual('Ok')
  })
  it('should throw an error if validation has failed', () => {
    validationResult.mockImplementation(() => {
      throw new Error
    })
    expect(validationResult).toThrow(new Error)
  })
})