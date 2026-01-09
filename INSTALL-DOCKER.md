# Quick Install: WAHA Tuval Node for Docker n8n

This modified WAHA node includes AI agent support, allowing you to use WhatsApp operations as tools in n8n AI workflows.

## Installation Steps

### 1. Install the node in your n8n Docker container

```bash
# Enter your n8n container
docker exec -it <your-n8n-container-name> sh

# Install the modified WAHA node
npm install --prefix ~/.n8n git+https://github.com/alontu/n8n-nodes-waha.git#claude/research-waha-ai-integration-GwkAV

# Exit the container
exit

# Restart n8n
docker restart <your-n8n-container-name>
```

Replace `<your-n8n-container-name>` with your actual container name (e.g., `n8n`, `n8n_container`).

### 2. Verify installation

1. Open n8n in your browser
2. Create a new workflow
3. Search for "WAHA Tuval" in the node picker
4. You should see:
   - **WAHA Tuval** (main node)
   - **WAHA Tuval Trigger** (webhook trigger)

## What's Different?

This modified version includes:

✅ **AI Agent Support** - Use WAHA operations as tools in AI Agent workflows
✅ **Custom Branding** - Shows as "WAHA Tuval" to distinguish from original
✅ **Same Functionality** - All standard WAHA features work as before

## Using with AI Agents

1. Add an **AI Agent** node to your workflow
2. Add a **Chat Model** (OpenAI, Claude, etc.)
3. In the Tools section, select **WAHA Tuval**
4. Configure your WAHA credentials
5. Test with: `"Send a WhatsApp message to +1234567890 saying hello"`

The AI will automatically use the WAHA node to send messages!

## Environment Variables

Ensure your n8n instance has:

```bash
N8N_ALLOW_COMMUNITY_PACKAGES_AS_TOOLS=true
```

This is the default in n8n v1.79.0+.

## Updating

To update to the latest version:

```bash
docker exec -it <your-n8n-container-name> sh
npm update --prefix ~/.n8n
exit
docker restart <your-n8n-container-name>
```

## Support

For issues or questions about this modified node, please visit the GitHub repository.
