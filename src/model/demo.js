import User from './test'

const user = {
    name: 'xuech',
    age: 22,
    email: 'xuech@126.com'
}

const insertMethods = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result)
}

// insertMethods()

const findMethods = async () => {
  const result = await User.find()
  console.log(result)
}
// findMethods()

const updateMethods = async () => {
  const result = await User.updateOne({name: 'xuech'},{ age: 30})
  console.log(result)
}
// updateMethods()

const delMethods = async () => {
  const result = await User.deleteOne({name: 'xuech'})
  console.log(result)
}
delMethods()