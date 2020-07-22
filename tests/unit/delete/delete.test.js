jest.mock('express')
const { deleteEmployee } = require('../../../src/controller/employee-functionality')
const mockingoose = require('mockingoose').default
const Employee = require('../../../src/model/employee')
const request = require('../mock-data/requests/single-employee.json')
const { response } = require('express')

describe('Delete Employee test suite', () => {
  beforeEach(() => {
    results = jest.fn()
  })
  it('should be defined', () => {
    expect(deleteEmployee).toBeDefined()
  })
  it('should find Employee by Employee ID', async () => {
    mockingoose(Employee).toReturn(request, 'findOne')
    const results = await Employee.findById({employeeID: '0efy65d68jgt543t'})

    expect(results.employeeID).toEqual(request.employeeID)
  })
  it('should find a Employee and delete it by employeeID', async () => {
    mockingoose(Employee).toReturn(request, 'findOne')
    const results = await Employee.findByIdAndDelete({employeeID: '0efy65d68jgt543t'})
    expect(results).toBe(undefined)
  })
  it('should send message when Employee has been successfully deleted', () => {
    const positiveResponse = {
      "response": "Employee: r7jTG7ghgy5wGO7L (Evie Butland) has been successfully deleted"
    }
    response.send.mockReturnValue({
      "response": "Employee: r7jTG7ghgy5wGO7L (Evie Butland) has been successfully deleted"
    })
    await expect(response.send).toEqual(positiveResponse)
  })
})