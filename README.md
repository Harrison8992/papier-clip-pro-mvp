# Paperclip Pro — MVP

Stack: **Next.js 14** + **Tailwind CSS** + **Lucide React** + **Firebase (Firestore)**.

## Démarrage

1) Installer les dépendances

```bash
npm install
```

2) Configurer Firebase (client)

Remplis `.env.local` avec les valeurs de ta Web App Firebase (Console Firebase → Project settings → General → Your apps).

3) Lancer le dashboard

```bash
npm run dev
```

## Seed Firestore (collection `leads`)

### Option A — Service account via fichier

1) Télécharge un **service account** JSON (Firebase Console → Project settings → Service accounts).
2) Mets le chemin dans `.env.local`:

```bash
FIREBASE_SERVICE_ACCOUNT=./service-account.json
```

Puis:

```bash
npm run seed:leads
```

### Option B — Service account via JSON inline

```bash
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
npm run seed:leads
```

