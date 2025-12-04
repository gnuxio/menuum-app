import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'

const REGION = process.env.AWS_REGION || process.env.NEXT_PUBLIC_COGNITO_REGION || 'us-east-1'
const TABLE_NAME = process.env.DYNAMODB_USER_PROFILES_TABLE || 'user_profiles'

// Crear cliente de DynamoDB
const client = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

// Crear documento client para operaciones más fáciles
const docClient = DynamoDBDocumentClient.from(client)

export interface UserProfile {
  user_id: string // Partition key (sub de Cognito)
  email: string
  name?: string
  country?: string
  phone_number?: string

  // Datos de onboarding
  objetivo?: string
  edad?: number
  peso?: number
  estatura?: number
  sexo?: string
  nivel_actividad?: string
  preferencias_alimenticias?: string
  restricciones_dieteticas?: string[]
  nivel_cocina?: string
  tiempo_cocina?: string
  equipo_cocina?: string[]

  onboarding_completed?: boolean
  created_at?: string
  updated_at?: string
}

/**
 * Obtiene el perfil de un usuario por su ID (sub de Cognito)
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        user_id: userId,
      },
    })

    const response = await docClient.send(command)
    return (response.Item as UserProfile) || null
  } catch (error) {
    console.error('Error getting user profile:', error)
    throw error
  }
}

/**
 * Crea o actualiza el perfil de un usuario
 */
export async function upsertUserProfile(profile: UserProfile): Promise<UserProfile> {
  try {
    const now = new Date().toISOString()

    const item = {
      ...profile,
      updated_at: now,
      created_at: profile.created_at || now,
    }

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    })

    await docClient.send(command)
    return item
  } catch (error) {
    console.error('Error upserting user profile:', error)
    throw error
  }
}

/**
 * Actualiza campos específicos del perfil
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'user_id'>>
): Promise<void> {
  try {
    // Construir la expresión de actualización
    const updateExpressions: string[] = []
    const expressionAttributeNames: Record<string, string> = {}
    const expressionAttributeValues: Record<string, any> = {}

    Object.keys(updates).forEach((key, index) => {
      const placeholder = `#attr${index}`
      const valuePlaceholder = `:val${index}`

      updateExpressions.push(`${placeholder} = ${valuePlaceholder}`)
      expressionAttributeNames[placeholder] = key
      expressionAttributeValues[valuePlaceholder] = updates[key as keyof typeof updates]
    })

    // Añadir updated_at
    updateExpressions.push(`#updatedAt = :updatedAt`)
    expressionAttributeNames['#updatedAt'] = 'updated_at'
    expressionAttributeValues[':updatedAt'] = new Date().toISOString()

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        user_id: userId,
      },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    })

    await docClient.send(command)
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

/**
 * Crea un perfil básico al registrarse
 */
export async function createBasicProfile(userId: string, email: string): Promise<UserProfile> {
  const profile: UserProfile = {
    user_id: userId,
    email,
    onboarding_completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  return upsertUserProfile(profile)
}
