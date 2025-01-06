export function calculateMacros(currentWeight, targetWeight, targetBodyFat) {
  // Convert weights to kg if needed
  const weight = currentWeight
  const goalWeight = targetWeight
  
  // Calculate lean body mass (assuming current body fat is higher than target)
  const leanMass = goalWeight * (1 - targetBodyFat / 100)
  
  // Calculate daily calories
  // Using the Mifflin-St Jeor equation as base
  const bmr = 10 * weight + 6.25 * 170 - 5 * 30 + 5 // Assuming average height and age
  const tdee = bmr * 1.2 // Sedentary multiplier
  
  // Adjust calories based on goal
  const calorieAdjustment = weight > goalWeight ? -500 : 500
  const dailyCalories = tdee + calorieAdjustment
  
  // Calculate macros
  const protein = leanMass * 2.2 // 2.2g per kg of lean mass
  const fat = (dailyCalories * 0.25) / 9 // 25% of calories from fat
  const carbs = (dailyCalories - (protein * 4 + fat * 9)) / 4 // Remaining calories from carbs
  
  return {
    calories: Math.round(dailyCalories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat)
  }
}
