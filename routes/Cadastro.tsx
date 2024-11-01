import { Button, StyleSheet, TextInput, View } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { useState, useEffect } from 'react'
import { User } from '@/models/User.interface';


export default function Cadastro({ navigation }) {

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (user?.uid) {
      navigation.navigate('Dashboard', {uid: user?.uid})
      saveUserOnDatabase()
    }
  })

  async function saveUserOnDatabase() {
    database.ref(`usuario/${user?.uid}`).set({
      name: name,
      cnpj: cnpj,
      telefone: telefone,
      email: email,
      uid: user?.uid
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async function createUser() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={{ margin: 24 }}>
      <TextInput
        placeholder='Nome da Empresa'
        onChangeText={(text) => setName(text)}
      />
            <TextInput
        placeholder='CNPJ'
        onChangeText={(text) => setCnpj(text)}
      />
            <TextInput
        placeholder='Telefone de contato'
        onChangeText={(text) => setTelefone(text)}
      />
      <TextInput
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='Senha'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button title='Criar Usuário'
        onPress={() => createUser()}
      />
      <Button title='Ir para Login'
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}