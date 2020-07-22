jest.mock('express')
const { deleteEmployee } = require('../../../src/controller/employee-functionality')
const mockingoose = require('mockingoose').default
const Employee = require('../../../src/model/employee')
const request = require('../mock-data/requests/single-employee.json')
const { response } = require('express')

describe('Delete Employee test suite', () => {
  beforeEach(() => {
    results = jest.fn()
    jest.clearAllMocks();
    mockingoose.resetAll();
  })
  it('should be defined', () => {
    expect(deleteEmployee).toBeDefined()
  })
  it('should find Employee by Employee ID', async () => {
    mockingoose(Employee).toReturn(request, 'findOne')
    const results = await Employee.findOne({employeeID: '0efy65d68jgt543t'})

    expect(results.employeeID).toEqual(request.employeeID)
  })
  it('should find a Employee and delete it by employeeID', async () => {
    mockingoose(Employee).toReturn(request, 'findOne')
    const results = await Employee.findByIdAndDelete({employeeID: '0efy65d68jgt543t'})
    expect(results).toBe(undefined)
  })
  it('should send message when a successful request has been made', () => {
    response.send.mockReturnValue({
      "response": "Employee: r7jTG7ghgy5wGO7L (Evie Butland) has been successfully deleted"
    })
    expect(response.send()).toEqual({
      "response": "Employee: r7jTG7ghgy5wGO7L (Evie Butland) has been successfully deleted"
    })
  })
})