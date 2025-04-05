# Technical Context

## Technology Stack

### Google Apps Script
- **Runtime**: V8 Engine
- **Language**: Modern JavaScript (ES6+)
- **Services**:
  - SlidesApp
  - PropertiesService
  - HtmlService
  - UrlFetchApp

### Frontend
- **Framework**: HTML Service with client-side JavaScript
- **UI Library**: Custom ShadCN-inspired components
- **Styling**: CSS3 with modern features
- **Responsiveness**: Flexbox and Grid layouts

### External Services
1. **OpenAI**
   - API Version: Latest
   - Models: GPT-3.5-turbo, GPT-4
   - Endpoint: api.openai.com

2. **Perplexity**
   - API Version: Beta
   - Models: Sonar
   - Endpoint: api.perplexity.ai

3. **Anthropic**
   - API Version: Latest
   - Models: Claude-3.5-sonnet
   - Endpoint: api.anthropic.com

4. **Google Gemini**
   - API Version: v1beta
   - Models: Latest available
   - Endpoint: generativelanguage.googleapis.com

5. **OpenRouter**
   - API Version: Latest
   - Models: Multiple
   - Endpoint: openrouter.ai/api

6. **DeepSeek**
   - API Version: Beta
   - Models: Latest available
   - Endpoint: api.deepseek.com

## Development Setup

### Environment
- **Editor**: Google Apps Script Editor
- **Version Control**: Git
- **Testing**: Built-in testing framework
- **Deployment**: Google Workspace Marketplace

### Dependencies
- No external npm packages (Google Apps Script limitation)
- All functionality built using native APIs
- Custom utility functions for common operations

### Configuration
```json
{
  "timeZone": "Asia/Kolkata",
  "dependencies": {
    "enabledAdvancedServices": [{
      "userSymbol": "Slides",
      "serviceId": "slides",
      "version": "v1"
    }]
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/script.container.ui",
    "https://www.googleapis.com/auth/presentations",
    "https://www.googleapis.com/auth/script.scriptapp",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/script.send_mail"
  ]
}
```

## Technical Constraints

### Google Apps Script Limitations
- 6-minute execution time limit
- Limited external API access
- No npm package support
- Browser compatibility requirements

### Security Requirements
- Secure API key storage
- OAuth2 authentication
- Content security policies
- Data encryption standards

### Performance Considerations
- API rate limits
- Resource usage optimization
- Response time requirements
- Cache management

## Development Guidelines

### Code Style
- ES6+ features when supported
- Consistent error handling
- Clear documentation
- Type hints in JSDoc

### Testing Strategy
- Unit tests for core functions
- Integration testing
- UI component testing
- Error scenario validation

### Deployment Process
- Version control workflow
- Testing requirements
- Documentation updates
- Release procedures 