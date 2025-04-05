# System Patterns

## Architecture Overview

### Core Components
1. **Server-Side (Code.gs)**
   - API key management
   - LLM provider integration
   - Slide generation logic
   - Google Slides manipulation

2. **Client-Side (Sidebar.html)**
   - User interface components
   - Input handling
   - Preview rendering
   - State management

3. **Configuration (appsscript.json)**
   - OAuth scopes
   - Advanced services
   - Project settings
   - Time zone configuration

## Design Patterns

### API Integration
1. **Provider Management**
   ```javascript
   const API_PROVIDERS = {
     [provider]: {
       name: string,
       validateUrl: string,
       headers: (key) => Object
     }
   }
   ```

2. **State Management**
   ```javascript
   PropertiesService.getUserProperties()
     .setProperty(key, value)
     .getProperty(key)
   ```

3. **Error Handling**
   ```javascript
   try {
     // Operation
     return { success: true, data }
   } catch (error) {
     console.error(error)
     return { success: false, message }
   }
   ```

### UI Components
1. **ShadCN-Inspired Elements**
   - Consistent styling
   - Responsive design
   - Accessibility support
   - Interactive feedback

2. **Progressive Disclosure**
   - Multi-step forms
   - Collapsible sections
   - Tooltips and hints
   - Loading states

## Technical Decisions

### Security
1. **API Key Storage**
   - Use PropertiesService for secure storage
   - Client-side encryption for transmission
   - Regular validation checks
   - Automatic key rotation support

2. **Access Control**
   - OAuth2 authentication
   - Scope-based permissions
   - User session management
   - Rate limiting

### Performance
1. **Caching Strategy**
   - API response caching
   - Template preloading
   - Resource optimization
   - State persistence

2. **Resource Management**
   - Efficient API usage
   - Memory optimization
   - Background processing
   - Error recovery

## Component Relationships

### Data Flow
1. **User Input → Server Processing**
   - Input validation
   - API key verification
   - LLM request handling
   - Response formatting

2. **Server → Presentation**
   - Slide generation
   - Content insertion
   - Style application
   - Preview rendering

### Event Handling
1. **User Interactions**
   - Form submissions
   - Button clicks
   - Keyboard shortcuts
   - Drag and drop

2. **System Events**
   - API responses
   - Error conditions
   - State changes
   - Async operations 