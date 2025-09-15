'use client'

import React, { useState } from 'react'
import { Autocomplete, Box, FormLabel, TextField, Typography } from '@mui/material'
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  Controller
} from 'react-hook-form'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../[formType]/form/types/Types'
import {
  formLabelStyles,
  inputPropsStyles,
  TextFieldStyles
} from '../../../../components/Styles/appStyles'
import Step3 from './Step3'

interface Step2Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  setValue: UseFormSetValue<FormData>
  errors: FieldErrors<FormData>
  fullName: string
  control: any
  selectedFiles: any
  setSelectedFiles: any
  credentialType?: string
}

const options = [
  'Friend',
  'Professional colleague',
  'Volunteered together',
  'College',
  'Other, enter preferred relationship label'
]

const Step2: React.FC<Step2Props> = ({
  register,
  watch,
  setValue,
  errors,
  fullName,
  control,
  selectedFiles,
  setSelectedFiles,
  credentialType = 'skill'
}) => {
  const displayName = fullName || ''
  const [isOther, setIsOther] = useState(false)

  const handleEditorChange = (field: string) => (value: string) => {
    setValue(field, value)
  }

  // Get dynamic text based on credential type
  const getRecommendationTitle = () => {
    return credentialType === 'employment'
      ? 'Confirmation of Job Title and Employment Details'
      : 'Recommendation'
  }

  const getRecommendationText = () => {
    return credentialType === 'employment'
      ? 'Please confirm the individual\'s formal job title, their hire date, and if fixed-term, the duration in which they are expected to stay in the position. If it is not a fixed-term hire, simply indicate that.'
      : 'write your recommendation here to support or confirm the requestor\'s skill claims.'
  }

  const getQualificationsTitle = () => {
    return credentialType === 'employment'
      ? 'Recommender\'s Role and Supporting Information'
      : 'Your Qualifications (optional):'
  }

  const getQualificationsText = () => {
    return credentialType === 'employment'
      ? 'Please indicate your role in the company and to whom the employee reports.'
      : 'Please share how you are qualified to provide this recommendation. Sharing your qualifications will further increase the value of this recommendation.'
  }

  const getRecommendationPlaceholder = () => {
    return credentialType === 'employment'
      ? `e.g., ${displayName} was hired as a Software Engineer on January 15, 2023. This is a permanent, full-time position. They report directly to me as their Engineering Manager.`
      : `I've worked with ${displayName} for about two years, managing her at The Coffee Place. She is an excellent worker, prompt, and applies the skills she learned in Barista training on a daily basis. —This is just an example of how the recommendation might begin.`
  }

  const getQualificationsPlaceholder = () => {
    return credentialType === 'employment'
      ? `e.g., I am the Engineering Manager at TechCorp and ${displayName} reports directly to me. I have been in this role for 3 years and am authorized to confirm employment details.`
      : `e.g., I have over 10 years of experience in the field and have worked closely with ${displayName}.`
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        bgcolor: '#f0f4f8',
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: 'white',
          p: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          borderRadius: 2
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: '32px', mb: '20px' }}>
            {getRecommendationTitle()} Details
          </Typography>
          <FormLabel sx={formLabelStyles} id='full-name-label'>
            Name (required):
          </FormLabel>
          <TextField
            {...register('fullName', {
              required: 'Full name is required'
            })}
            placeholder='Firstname Lastname'
            variant='outlined'
            sx={TextFieldStyles}
            aria-labelledby='full-name-label'
            inputProps={{
              'aria-label': 'Full Name',
              style: inputPropsStyles
            }}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        </Box>

        <Box>
          <FormLabel sx={formLabelStyles} id='relationship-label'>
            How do you know {displayName} (required)?
          </FormLabel>

          <Controller
            name='howKnow'
            control={control}
            rules={{ required: 'Relationship is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                freeSolo={isOther}
                options={options}
                value={value || ''}
                onChange={(event, newValue) => {
                  if (newValue === 'Other, enter preferred relationship label') {
                    setIsOther(true)
                    onChange('')
                  } else {
                    setIsOther(false)
                    onChange(newValue)
                  }
                }}
                onInputChange={(event, newInputValue) => {
                  if (isOther) {
                    onChange(newInputValue)
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder='Select your relationship'
                    variant='outlined'
                    sx={TextFieldStyles}
                    aria-labelledby='relationship-label'
                    inputProps={{
                      ...params.inputProps,
                      readOnly: !isOther,
                      style: inputPropsStyles
                    }}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            )}
          />
        </Box>

        <Box>
          <Typography sx={formLabelStyles} id='recommendation-text-label'>
            {getRecommendationText()}
          </Typography>
          <TextEditor
            key={`recommendation-${credentialType}`}
            value={watch('recommendationText') || ''}
            onChange={handleEditorChange('recommendationText')}
            placeholder={getRecommendationPlaceholder()}
          />
          {errors.recommendationText && (
            <Typography color='error'>{errors.recommendationText.message}</Typography>
          )}
        </Box>

        {/* Qualifications */}
        <Box>
          <Typography sx={formLabelStyles} id='qualifications-label'>
            {getQualificationsTitle()}
          </Typography>
          <Typography sx={{ marginBottom: '10px', fontSize: '14px' }}>
            {getQualificationsText()}
          </Typography>
          <TextEditor
            key={`qualifications-${credentialType}`}
            value={watch('qualifications') || ''}
            onChange={handleEditorChange('qualifications')}
            placeholder={getQualificationsPlaceholder()}
          />
          {errors.qualifications && (
            <Typography color='error'>{errors.qualifications.message}</Typography>
          )}
        </Box>
      </Box>

      <Step3
        watch={watch}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        setValue={setValue}
        credentialType={credentialType}
      />
    </Box>
  )
}
export default Step2
