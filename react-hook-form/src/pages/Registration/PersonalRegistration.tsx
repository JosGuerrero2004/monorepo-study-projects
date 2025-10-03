import { Button, Label, Fieldset, Input, Form, Title } from '../../components'
import { useForm } from 'react-hook-form'
interface FomrInputProps {
  name: string
  phone: string
  email: string
  password: string
  confirmedPassword: string
}

const PersonalRegistration = () => {
  const { register, handleSubmit } = useForm<FomrInputProps>()

  const onSubmitted = (data: FomrInputProps) => {
    console.log(data)
  }
  return (
    <>
      <Title>Ingresa algunos datos básicos:</Title>
      <Form onSubmit={handleSubmit(onSubmitted)}>
        <Fieldset>
          <Label htmlFor='field-name'>Nombre</Label>
          <Input
            id='field-name'
            placeholder='Escribe tu nombre completo'
            type='text'
            {...register('name')}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor='field-email'>Correo electrónico</Label>
          <Input
            id='field-email'
            placeholder='Ingresa tu dirección de correo electrónico'
            type='email'
            {...register('email')}
          />
        </Fieldset>

        <Fieldset>
          <Label>Teléfono</Label>
          <Input
            id='field-phone'
            type='text'
            placeholder='Ej: (DDD)XX XXXX-XXXX'
            {...register('phone')}
          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor='field-password'>Crea una contraseña</Label>
          <Input
            id='field-password'
            placeholder='Crea una contraseña'
            type='password'
            {...register('password')}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor='field-confirm-password'>Repite la contraseña</Label>
          <Input
            id='field-confirm-password'
            placeholder='Repite la contraseña anterior'
            type='password'
            {...register('confirmedPassword')}
          />
        </Fieldset>
        <Button type='submit'>Avanzar</Button>
      </Form>
    </>
  )
}

export default PersonalRegistration
