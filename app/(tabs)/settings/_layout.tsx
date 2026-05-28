import { Stack } from 'expo-router'
import React from 'react'

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{
        title: "Profile Settings"
      }} />
      <Stack.Screen name="cleanup" options={{
        headerBackButtonDisplayMode: 'minimal',
        title: "Cleanup"
      }} />
    </Stack>
  )
}

export default SettingsLayout