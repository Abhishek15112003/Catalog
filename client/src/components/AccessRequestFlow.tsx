import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, FileText, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { App } from '@/lib/types'

interface AccessRequestFlowProps {
  app: App
  onBack: () => void
  onSubmit: (justification: string) => void
}

const steps = [
  { id: 1, title: 'App Information', icon: FileText },
  { id: 2, title: 'Request Details', icon: User },
  { id: 3, title: 'Confirmation', icon: CheckCircle }
]

export default function AccessRequestFlow({ app, onBack, onSubmit }: AccessRequestFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [justification, setJustification] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      onSubmit(justification)
      setIsSubmitting(false)
    }, 2000)
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} data-testid="button-back">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Request Access</h1>
          <p className="text-muted-foreground">{app.name}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" data-testid="progress-bar" />
      </div>

      {/* Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 ${
              step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
            data-testid={`step-${step.id}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.id <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <step.icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium hidden sm:block">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="text-3xl">{app.icon}</div>
                <div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.publisher}</p>
                  <p className="text-sm mt-2">{app.description}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Access Requirements:</h4>
                <ul className="space-y-1">
                  {app.requirements.map((requirement, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-chart-1 mt-0.5 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="justification">Business Justification *</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Please explain why you need access to this application and how it will be used.
                </p>
                <Textarea
                  id="justification"
                  placeholder="e.g., I need access to Figma for the upcoming product redesign project. This will allow me to collaborate with the design team and create user interface mockups..."
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="min-h-32"
                  data-testid="textarea-justification"
                />
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                  <li>Your request will be reviewed by your manager</li>
                  <li>IT Security will verify compliance requirements</li>
                  <li>You'll receive an email notification with the decision</li>
                  <li>If approved, access will be provisioned within 24 hours</li>
                </ol>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 text-center">
              <div className="bg-chart-1/10 p-6 rounded-lg">
                <CheckCircle className="h-12 w-12 text-chart-1 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Request Ready to Submit</h3>
                <p className="text-muted-foreground mb-4">
                  Please review your request details before submitting.
                </p>
              </div>
              
              <div className="text-left bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Application:</span>
                  <span>{app.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Publisher:</span>
                  <span>{app.publisher}</span>
                </div>
                <div>
                  <span className="font-medium">Justification:</span>
                  <p className="text-sm text-muted-foreground mt-1">{justification}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          data-testid="button-previous"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={handleNext}
            disabled={currentStep === 2 && justification.trim().length < 10}
            data-testid="button-next"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || justification.trim().length < 10}
            data-testid="button-submit"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </Button>
        )}
      </div>
    </div>
  )
}