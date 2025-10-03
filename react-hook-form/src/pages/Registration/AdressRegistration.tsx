import {
  Button,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Title,
} from '../../components'

const AddressRegistration = () => {
  return (
    <>
      <Title>Ahora, algunos datos más sobre ti:</Title>
      <Form>
        <Fieldset>
          <Label htmlFor="field-zip-code">Código Postal</Label>
          <Input
            id="field-zip-code"
            placeholder="Ingresa tu Código Postal"
            type="text"
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-street">Calle</Label>
          <Input id="field-street" placeholder="Av Triunvirato" type="text" />
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="field-street-number">Número</Label>
            <Input
              id="field-street-number"
              placeholder="Ej: 1440"
              type="text"
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="field-neighborhood">Barrio</Label>
            <Input
              id="field-neighborhood"
              placeholder="Villa Urquiza"
              type="text"
            />
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="field-city">Ciudad</Label>
          <Input id="field-city" placeholder="Ciudad Autónoma de Buenos Aires, CABA" type="text" />
        </Fieldset>
        <Button type="submit">Registrar</Button>
      </Form>
    </>
  )
}

export default AddressRegistration
