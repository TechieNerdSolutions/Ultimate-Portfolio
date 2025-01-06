'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Copy, RefreshCw } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const { toast } = useToast()

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === '') {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      })
      return
    }

    let generatedPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generatedPassword += chars[randomIndex]
    }

    setPassword(generatedPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    })
  }

  const calculateStrength = () => {
    let strength = 0
    if (includeUppercase) strength++
    if (includeLowercase) strength++
    if (includeNumbers) strength++
    if (includeSymbols) strength++
    if (length >= 12) strength++
    return strength
  }

  const getStrengthColor = () => {
    const strength = calculateStrength()
    if (strength <= 2) return 'bg-red-500'
    if (strength <= 3) return 'bg-yellow-500'
    if (strength <= 4) return 'bg-green-500'
    return 'bg-emerald-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
        <CardDescription>
          Generate secure passwords with custom requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Password Length: {length}</span>
              <span className="text-muted-foreground">8-32 characters</span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              min={8}
              max={32}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="uppercase" className="text-sm">Include Uppercase</label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="lowercase" className="text-sm">Include Lowercase</label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="numbers" className="text-sm">Include Numbers</label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="symbols" className="text-sm">Include Symbols</label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Password
          </Button>

          {password && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 flex-1 rounded-full ${getStrengthColor()}`} />
                <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="rounded-md bg-muted p-4 font-mono text-sm break-all">
                {password}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

