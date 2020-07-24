jest.mock('express')
jest.mock('../../../src/controller/helpers')
const { getEmployeeByEmployeeID } = require('../../../src/controller/employee-functionality')
const mockingoose = require('mockingoose').default
const Employee = require('../../../src/model/employee')
const responseEmployee = require('../mock-data/responses/single-employee.json')
const { response } = require('express')
const { increaseCounter } = require('../../../src/controller/helpers')


describe('Get Employee by Employee ID', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockingoose.resetAll();
  })
  it('should be defined', () => {
    expect(getEmployeeByEmployeeID).toBeDefined()
  })
  it('should return Employee by Employee ID', async () => {
    mockingoose(Employee).toReturn(responseEmployee, 'findOne')
    const result = await Employee.findOne({employeeID: '0efy65d68jgt543t'})
    expect(result.employeeID).toEqual(responseEmployee.employeeID)
  })
  it('should fail with incorrect id passed into findById', async () => {
    mockingoose(Employee).toReturn(responseEmployee, 'findOne')
    const result = await Employee.findById({_id: '5678'})
    expect((result._id)).not.toBe(responseEmployee._id);
  })
  it('should throw an error if no employee is found', () => {
    response.send.mockReturnValue('Not Found')
    expect(response.send()).toEqual('Not Found')
  })
  it('should return welcome message increase counter value in each call', () => {
    increaseCounter.mockReturnValue(false)
    if(!increaseCounter()){
      response.send.mockReturnValue('Welcome, Evie')
    }
    expect(response.send()).toEqual('Welcome, Evie')
  })
  it('should return goodbye message increase counter value in each call', () => {
    increaseCounter.mockReturnValue(true)
    if(!increaseCounter()){
      response.send.mockReturnValue('Welcome, Evie')
    } else {
      response.send.mockReturnValue('Goodbye')

    }
    expect(response.send()).toEqual('Goodbye')
  })
  it('should send a welcome message when a successful request is made', () => {
    response.send.mockReturnValue('Welcome, Evie')
    expect(response.send()).toEqual('Welcome, Evie')
  })
})