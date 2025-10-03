import { useState } from 'react'
import { Button, Label, Fieldset, Input, Form, Title } from '../../components'

const PersonalRegistration = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ name, email, phone, password, confirmedPassword })
  }

  return (
    <>
      <Title>Ingresa algunos datos básicos:</Title>
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Label htmlFor="field-name">Nombre</Label>
          <Input
            id="field-name"
            placeholder="Escribe tu nombre completo"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-email">Correo electrónico</Label>
          <Input
            id="field-email"
            placeholder="Ingresa tu dirección de correo electrónico"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </Fieldset>

        <Fieldset>
          <Label>Teléfono</Label>
          <Input
            id="field-phone"
            type="text"
            placeholder="Ej: (DDD)XX XXXX-XXXX"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="field-password">Crea una contraseña</Label>
          <Input
            id="field-password"
            placeholder="Crea una contraseña"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-confirm-password">Repite la contraseña</Label>
          <Input
            id="field-confirm-password"
            placeholder="Repite la contraseña anterior"
            type="password"
            value={confirmedPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmedPassword(e.target.value)
            }
          />
        </Fieldset>
        <Button type="submit">Avanzar</Button>
      </Form>
    </>
  )
}

export default PersonalRegistration
