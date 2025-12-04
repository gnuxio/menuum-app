# Configuración de AWS para Menuum

Esta guía te ayudará a configurar AWS Cognito y DynamoDB para la aplicación Menuum.

## Requisitos Previos

- Cuenta de AWS
- AWS CLI instalado y configurado (opcional, pero recomendado)
- Acceso a la consola de AWS

---

## 1. Configurar AWS Cognito User Pool

### Paso 1: Crear User Pool

1. Accede a la [Consola de AWS Cognito](https://console.aws.amazon.com/cognito)
2. Haz clic en **"Create user pool"**
3. Configura las siguientes opciones:

#### **Sign-in experience**
- **Sign-in options**: Selecciona **Email**
- Haz clic en **Next**

#### **Security requirements**
- **Password policy**:
  - Modo: **Cognito defaults** (o personaliza según tus necesidades)
  - Mínimo 8 caracteres recomendado
- **Multi-factor authentication**:
  - Selecciona **No MFA** (por ahora, puedes habilitarlo después)
- **User account recovery**:
  - Selecciona **Email only**
- Haz clic en **Next**

#### **Sign-up experience**
- **Self-registration**: **Enable self-registration**
- **Attribute verification**:
  - **IMPORTANTE**: Para desarrollo sin confirmación de email, selecciona:
    - **Send email message, verify email address** DESHABILITADO
  - Para producción (con confirmación de email):
    - **Send email message, verify email address** HABILITADO
- **Required attributes**:
  - Selecciona solo **email** (ya seleccionado por defecto)
- Haz clic en **Next**

#### **Message delivery**
- **Email provider**: Selecciona **Send email with Cognito**
  - Para producción considera usar **Send email with Amazon SES**
- Haz clic en **Next**

#### **Integrate your app**
- **User pool name**: `menuum-user-pool` (o el nombre que prefieras)
- **Hosted UI**: **No** (usamos UI custom)
- **App client name**: `menuum-web-client`
- **Client secret**: Selecciona **Don't generate a client secret**
- **Advanced app client settings**:
  - **Authentication flows**:
    - ✅ **ALLOW_USER_PASSWORD_AUTH**
    - ✅ **ALLOW_REFRESH_TOKEN_AUTH**
- Haz clic en **Next**

#### **Review and create**
- Revisa la configuración
- Haz clic en **Create user pool**

### Paso 2: Obtener credenciales del User Pool

Una vez creado el User Pool:

1. Haz clic en el User Pool que acabas de crear
2. Anota los siguientes valores:
   - **User pool ID**: Lo encuentras en la parte superior (formato: `us-east-1_xxxxxxxx`)
   - **Region**: La región donde creaste el pool (ej: `us-east-1`)
3. Ve a la pestaña **App integration**
4. En **App clients and analytics**, haz clic en tu app client
5. Anota:
   - **Client ID**: El ID del cliente (formato: string largo alfanumérico)

### Paso 3: Configurar Auto-confirmación (Opcional - Solo Desarrollo)

Si quieres que los usuarios se registren sin confirmación de email (solo para desarrollo):

1. Ve a **User pool properties** → **Lambda triggers**
2. Configura un **Pre sign-up** trigger con una función Lambda:

```javascript
exports.handler = async (event) => {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
    return event;
};
```

---

## 2. Configurar DynamoDB

### Paso 1: Crear tabla de user_profiles

1. Accede a la [Consola de DynamoDB](https://console.aws.amazon.com/dynamodb)
2. Haz clic en **Create table**
3. Configura:
   - **Table name**: `user_profiles`
   - **Partition key**: `user_id` (String)
   - **Sort key**: Dejar vacío
   - **Table settings**: Selecciona **Default settings** o **Customize settings** según necesites
   - Para desarrollo puedes usar **On-demand** capacity mode
4. Haz clic en **Create table**

### Paso 2: Crear usuario IAM para acceso

1. Accede a [AWS IAM](https://console.aws.amazon.com/iam)
2. Ve a **Users** → **Create user**
3. **User name**: `menuum-dynamodb-user`
4. Haz clic en **Next**
5. En **Permissions options**, selecciona **Attach policies directly**
6. Busca y selecciona **AmazonDynamoDBFullAccess** (para desarrollo)
   - Para producción, crea una política custom con permisos específicos solo para la tabla `user_profiles`
7. Haz clic en **Next** → **Create user**

### Paso 3: Crear Access Keys

1. Haz clic en el usuario que acabas de crear
2. Ve a **Security credentials**
3. En **Access keys**, haz clic en **Create access key**
4. Selecciona **Application running outside AWS**
5. Haz clic en **Next** → **Create access key**
6. **¡IMPORTANTE!** Guarda estos valores de forma segura:
   - **Access key ID**
   - **Secret access key**
   - Solo se muestran una vez

---

## 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# AWS Cognito Configuration
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_COOKIE_DOMAIN=localhost

# AWS DynamoDB Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id-here
AWS_SECRET_ACCESS_KEY=your-secret-access-key-here
DYNAMODB_USER_PROFILES_TABLE=user_profiles

# Backend API
NEXT_PUBLIC_API_URL=https://api.menuum.com
```

### Valores a reemplazar:

- `NEXT_PUBLIC_COGNITO_REGION`: La región de tu User Pool (ej: `us-east-1`)
- `NEXT_PUBLIC_COGNITO_USER_POOL_ID`: El User Pool ID de Cognito
- `NEXT_PUBLIC_COGNITO_CLIENT_ID`: El Client ID de tu app
- `NEXT_PUBLIC_COOKIE_DOMAIN`:
  - Desarrollo: `localhost`
  - Producción: `menuum.com` o `app.menuum.com`
- `AWS_ACCESS_KEY_ID`: Tu Access Key ID del usuario IAM
- `AWS_SECRET_ACCESS_KEY`: Tu Secret Access Key del usuario IAM

---

## 4. Actualizar Backend Go (Si aplica)

Si tienes un backend en Go que valida JWT de Supabase, necesitarás actualizarlo para validar JWT de Cognito:

### Cambios necesarios:

1. **JWKS Endpoint**: Cambiar de Supabase a Cognito
   ```go
   // Antes (Supabase)
   jwksURL := "https://<project-ref>.supabase.co/auth/v1/jwks"

   // Después (Cognito)
   region := "us-east-1"
   userPoolID := "us-east-1_xxxxxxxx"
   jwksURL := fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json", region, userPoolID)
   ```

2. **Issuer Validation**: Cambiar el issuer esperado
   ```go
   // Antes (Supabase)
   expectedIssuer := "https://<project-ref>.supabase.co/auth/v1"

   // Después (Cognito)
   expectedIssuer := fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s", region, userPoolID)
   ```

3. **User ID Claim**: Extraer el user ID del claim correcto
   ```go
   // Antes (Supabase)
   userID := claims["sub"].(string)

   // Después (Cognito) - mismo claim, pero asegúrate de validar
   userID := claims["sub"].(string)
   ```

4. **Audience (aud)**: Validar contra el Client ID
   ```go
   expectedAudience := "your-cognito-client-id"
   if claims["aud"] != expectedAudience {
       return errors.New("invalid token audience")
   }
   ```

---

## 5. Verificar la Instalación

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Prueba el registro:
   - Ve a `http://localhost:3000/register`
   - Registra un nuevo usuario
   - Verifica que no haya errores en la consola

3. Verifica en AWS:
   - **Cognito**: Ve a tu User Pool y verifica que aparezca el usuario en **Users**
   - **DynamoDB**: Ve a la tabla `user_profiles` (aún no habrá datos hasta que se complete el onboarding)

4. Prueba el login:
   - Ve a `http://localhost:3000/login`
   - Inicia sesión con el usuario creado
   - Deberías ser redirigido al dashboard

---

## 6. Políticas IAM Recomendadas para Producción

En lugar de usar `AmazonDynamoDBFullAccess`, crea una política custom:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:YOUR-ACCOUNT-ID:table/user_profiles"
    }
  ]
}
```

---

## 7. Configuración para Producción

### Cognito Hosted UI (Opcional)

Si prefieres usar Cognito Hosted UI en lugar del flujo custom:

1. Ve a tu User Pool → **App integration**
2. Haz clic en tu app client
3. Edita **Hosted UI settings**
4. Configura:
   - **Allowed callback URLs**: `https://app.menuum.com`
   - **Allowed sign-out URLs**: `https://app.menuum.com/login`
   - **OAuth 2.0 grant types**: Authorization code grant
   - **OpenID Connect scopes**: email, openid, profile

### DynamoDB Backups

1. Ve a tu tabla en DynamoDB
2. **Backups** → **Enable point-in-time recovery**

### Monitoreo

1. Configura **CloudWatch Alarms** para:
   - Errores de autenticación en Cognito
   - Throttling en DynamoDB
   - Errores del servidor

---

## Troubleshooting

### Error: "Token verification failed"
- Verifica que `NEXT_PUBLIC_COGNITO_USER_POOL_ID` y `NEXT_PUBLIC_COGNITO_CLIENT_ID` sean correctos
- Verifica que `NEXT_PUBLIC_COGNITO_REGION` coincida con la región del User Pool

### Error: "AccessDeniedException" en DynamoDB
- Verifica las credenciales IAM en `.env.local`
- Verifica que el usuario IAM tenga permisos para DynamoDB

### Usuario no puede registrarse
- Si configuraste confirmación de email, el usuario debe confirmar su email primero
- Verifica la configuración de **User pool properties** → **Email**

### Cookies no se guardan
- En desarrollo con localhost, asegúrate de que `NEXT_PUBLIC_COOKIE_DOMAIN=localhost`
- En producción, usa el dominio correcto sin `https://`

---

## Recursos Adicionales

- [Documentación de AWS Cognito](https://docs.aws.amazon.com/cognito/)
- [Documentación de AWS Amplify](https://docs.amplify.aws/)
- [Documentación de DynamoDB](https://docs.aws.amazon.com/dynamodb/)
- [Next.js con Amplify](https://docs.amplify.aws/nextjs/)

---

## Soporte

Si encuentras problemas durante la configuración, verifica:
1. Las variables de entorno en `.env.local`
2. Los logs de la consola del navegador
3. Los logs del servidor Next.js
4. Los logs de CloudWatch (para errores en AWS)
