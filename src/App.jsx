import React, { useState } from 'react'
import { Container, TextInput, Button, Title, Card, Text, Stack, Group } from '@mantine/core'
import { calculateMacros } from './utils/calculateMacros'

export default function App() {
  const [formData, setFormData] = useState({
    currentWeight: '',
    targetWeight: '',
    targetBodyFat: ''
  })
  const [macros, setMacros] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = calculateMacros(
      Number(formData.currentWeight),
      Number(formData.targetWeight),
      Number(formData.targetBodyFat)
    )
    setMacros(result)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container size="sm" py="xl">
      <Title order={1} mb="lg">Macro Calculator</Title>
      
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Current Weight (kg)"
            name="currentWeight"
            type="number"
            value={formData.currentWeight}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Target Weight (kg)"
            name="targetWeight"
            type="number"
            value={formData.targetWeight}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Target Body Fat %"
            name="targetBodyFat"
            type="number"
            value={formData.targetBodyFat}
            onChange={handleChange}
            required
          />
          <Button type="submit">Calculate Macros</Button>
        </Stack>
      </form>

      {macros && (
        <Card mt="xl" withBorder>
          <Title order={2} size="h3" mb="md">Your Daily Macros</Title>
          <Stack>
            <Group>
              <Text fw={500}>Calories:</Text>
              <Text>{macros.calories} kcal</Text>
            </Group>
            <Group>
              <Text fw={500}>Protein:</Text>
              <Text>{macros.protein}g</Text>
            </Group>
            <Group>
              <Text fw={500}>Carbs:</Text>
              <Text>{macros.carbs}g</Text>
            </Group>
            <Group>
              <Text fw={500}>Fat:</Text>
              <Text>{macros.fat}g</Text>
            </Group>
          </Stack>
        </Card>
      )}
    </Container>
  )
}
