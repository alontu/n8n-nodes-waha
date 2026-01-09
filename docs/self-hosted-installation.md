# Installing Modified WAHA Node in Self-Hosted n8n

## Docker Compose Setup (Recommended)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
      - N8N_CUSTOM_EXTENSIONS=/custom-nodes
      # Enable community packages as tools for AI agents
      - N8N_ALLOW_COMMUNITY_PACKAGES_AS_TOOLS=true
    volumes:
      - n8n_data:/home/node/.n8n
      - ./custom-nodes:/custom-nodes:ro
    networks:
      - n8n-network

volumes:
  n8n_data:

networks:
  n8n-network:
```

### Installation Steps

#### 1. Build the WAHA node package
```bash
cd n8n-nodes-waha
npm install
npm run build
npm pack
```

#### 2. Set up custom nodes directory
```bash
mkdir -p custom-nodes
npm install --prefix ./custom-nodes ./devlikeapro-n8n-nodes-waha-2025.2.9.tgz
```

#### 3. Start n8n
```bash
docker-compose up -d
```

#### 4. Verify installation
- Open http://localhost:5678
- Create a new workflow
- Search for "WAHA" in the node list
- Create an AI Agent workflow to test tool functionality

### Updating the Node

When you make changes:

```bash
# Rebuild the package
cd n8n-nodes-waha
npm run build
npm pack

# Update in custom nodes
npm install --prefix ./custom-nodes ./devlikeapro-n8n-nodes-waha-2025.2.9.tgz

# Restart n8n
docker-compose restart
```

---

## Alternative: Install from GitHub

You can also install directly from your GitHub repository:

```bash
mkdir -p custom-nodes
npm install --prefix ./custom-nodes alontu/n8n-nodes-waha#claude/research-waha-ai-integration-GwkAV
```

Then use the same docker-compose.yml as above.

---

## Testing AI Agent Integration

### 1. Create Test Workflow

1. Add **Chat Trigger** node
2. Add **AI Agent** node (Tools Agent)
3. In AI Agent, add:
   - **OpenAI Chat Model** (or any other LLM)
   - **WAHA** as a tool (should appear in the tools list)
4. Configure WAHA credentials

### 2. Test Prompt

Try: `"Send a WhatsApp message to +1234567890 saying 'Hello from AI agent!'"`

The AI should:
- Recognize it needs to use the WAHA tool
- Fill in the appropriate parameters
- Execute the message send
- Return the result

---

## Troubleshooting

### Node not appearing in n8n

1. Check custom nodes were installed:
```bash
ls -la custom-nodes/node_modules/@devlikeapro/n8n-nodes-waha
```

2. Check n8n logs:
```bash
docker-compose logs n8n | grep -i waha
```

3. Verify environment variable:
```bash
docker exec n8n env | grep N8N_CUSTOM_EXTENSIONS
```

### WAHA not appearing as AI agent tool

1. Ensure you're using n8n v1.79.0 or later
2. Check environment variable is set:
```bash
N8N_ALLOW_COMMUNITY_PACKAGES_AS_TOOLS=true
```

3. Verify the built package includes `usableAsTool`:
```bash
cat custom-nodes/node_modules/@devlikeapro/n8n-nodes-waha/dist/nodes/WAHA/base/node.js | grep usableAsTool
```

Should output: `usableAsTool: true,`

---

## Production Considerations

### 1. Version Pinning
Use specific version tags instead of branches:
```bash
npm install --prefix ./custom-nodes alontu/n8n-nodes-waha#v2025.2.9-ai
```

### 2. Security
- Ensure WAHA credentials are properly secured
- Use n8n's credential encryption
- Limit AI agent access to specific operations if needed

### 3. Monitoring
- Monitor LLM token usage (AI agents see all WAHA operations)
- Set up rate limiting if needed
- Log AI agent tool calls for debugging

### 4. Updates
Create a script to automate updates:

```bash
#!/bin/bash
# update-waha.sh

cd n8n-nodes-waha
git pull
npm install
npm run build
npm pack
npm install --prefix ../custom-nodes ./devlikeapro-n8n-nodes-waha-*.tgz
cd ..
docker-compose restart n8n
```
