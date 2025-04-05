/**
 * Creates a custom menu in Google Slides when the document is opened.
 */
function onOpen() {
  SlidesApp.getUi()
    .createMenu('Slide Generator')
    .addItem('Open Sidebar', 'showSidebar')
    .addToUi();
}

/**
 * Shows the Slide Generator sidebar.
 */
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Slide Generator')
    .setWidth(400);
  SlidesApp.getUi().showSidebar(html);
}

/**
 * Shows the about dialog with version information.
 */
function showAbout() {
  const ui = SlidesApp.getUi();
  ui.alert(
    '🎯 Slide Generator',
    'Version 1.0\n\n' +
    'Generate professional slides using AI.\n' +
    'For support, visit our documentation.',
    ui.ButtonSet.OK
  );
}

/**
 * Generates slides based on the provided parameters.
 * @param {Object} params - The parameters for slide generation
 * @return {Object} The generation result
 */
function generateSlides(params) {
  try {
    // This is a placeholder for the slide generation logic
    // You'll implement the actual AI-powered generation here
    
    const presentation = SlidesApp.getActivePresentation();
    const result = {
      success: true,
      message: 'Slides generated successfully',
      slideCount: 0
    };
    
    return result;
  } catch (error) {
    console.error('Error generating slides:', error);
    return {
      success: false,
      message: 'Failed to generate slides: ' + error.message
    };
  }
}

// Constants for API key storage
const API_KEY_PREFIX = 'API_KEY_';
const MODEL_PREFERENCE_KEY = 'MODEL_PREFERENCE';
const DEFAULT_MODEL = 'openai';

// API Providers configuration
const API_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    validateUrl: 'https://api.openai.com/v1/models',
    headers: (key) => ({ 'Authorization': `Bearer ${key}` })
  },
  perplexity: {
    name: 'Perplexity',
    validateUrl: 'https://api.perplexity.ai/chat/completions',
    headers: (key) => ({ 'Authorization': `Bearer ${key}` })
  },
  anthropic: {
    name: 'Anthropic',
    validateUrl: 'https://api.anthropic.com/v1/messages',
    headers: (key) => ({ 'x-api-key': key })
  },
  gemini: {
    name: 'Google Gemini',
    validateUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    headers: (key) => ({ 'x-goog-api-key': key })
  },
  openrouter: {
    name: 'OpenRouter',
    validateUrl: 'https://openrouter.ai/api/v1/models',
    headers: (key) => ({ 'Authorization': `Bearer ${key}` })
  },
  deepseek: {
    name: 'DeepSeek',
    validateUrl: 'https://api.deepseek.com/v1/models',
    headers: (key) => ({ 'Authorization': `Bearer ${key}` })
  }
};

/**
 * Saves an API key for a specific provider
 * @param {string} provider - The API provider name
 * @param {string} apiKey - The API key to save
 * @returns {Object} Result object with success status and message
 */
function saveApiKey(provider, apiKey) {
  try {
    // Validate provider
    if (!API_PROVIDERS[provider]) {
      return { success: false, message: 'Invalid provider' };
    }

    // Validate API key format (basic check)
    if (!apiKey || apiKey.trim().length < 8) {
      return { success: false, message: 'Invalid API key format' };
    }

    // Store the API key
    PropertiesService.getUserProperties().setProperty(
      `${API_KEY_PREFIX}${provider}`,
      apiKey
    );

    return { success: true, message: 'API key saved successfully' };
  } catch (error) {
    console.error('Error saving API key:', error);
    return { success: false, message: 'Failed to save API key' };
  }
}

/**
 * Retrieves an API key for a specific provider
 * @param {string} provider - The API provider name
 * @returns {Object} Result object with success status and API key
 */
function getApiKey(provider) {
  try {
    const apiKey = PropertiesService.getUserProperties().getProperty(
      `${API_KEY_PREFIX}${provider}`
    );
    return { success: true, apiKey: apiKey || '' };
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return { success: false, message: 'Failed to retrieve API key' };
  }
}

/**
 * Validates an API key with the provider's API
 * @param {string} provider - The API provider name
 * @param {string} apiKey - The API key to validate
 * @returns {Object} Result object with validation status
 */
function validateApiKey(provider, apiKey) {
  try {
    const providerConfig = API_PROVIDERS[provider];
    if (!providerConfig) {
      return { success: false, message: 'Invalid provider' };
    }

    const options = {
      method: 'GET',
      headers: providerConfig.headers(apiKey),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(providerConfig.validateUrl, options);
    const statusCode = response.getResponseCode();

    if (statusCode === 200 || statusCode === 201) {
      return { success: true, message: 'API key is valid' };
    } else {
      return { success: false, message: 'Invalid API key' };
    }
  } catch (error) {
    console.error('Error validating API key:', error);
    return { success: false, message: 'Failed to validate API key' };
  }
}

/**
 * Updates the preferred model for slide generation
 * @param {string} model - The model identifier
 * @returns {Object} Result object with success status
 */
function updateModelPreference(model) {
  try {
    if (!API_PROVIDERS[model]) {
      return { success: false, message: 'Invalid model' };
    }

    PropertiesService.getUserProperties().setProperty(
      MODEL_PREFERENCE_KEY,
      model
    );
    return { success: true, message: 'Model preference updated' };
  } catch (error) {
    console.error('Error updating model preference:', error);
    return { success: false, message: 'Failed to update model preference' };
  }
}

/**
 * Gets the currently preferred model
 * @returns {Object} Result object with success status and model preference
 */
function getModelPreference() {
  try {
    const model = PropertiesService.getUserProperties().getProperty(
      MODEL_PREFERENCE_KEY
    ) || DEFAULT_MODEL;
    return { success: true, model: model };
  } catch (error) {
    console.error('Error getting model preference:', error);
    return { success: false, message: 'Failed to get model preference' };
  }
}

/**
 * Deletes an API key for a specific provider
 * @param {string} provider - The API provider name
 * @returns {Object} Result object with success status
 */
function deleteApiKey(provider) {
  try {
    if (!API_PROVIDERS[provider]) {
      return { success: false, message: 'Invalid provider' };
    }

    PropertiesService.getUserProperties().deleteProperty(
      `${API_KEY_PREFIX}${provider}`
    );
    return { success: true, message: 'API key deleted successfully' };
  } catch (error) {
    console.error('Error deleting API key:', error);
    return { success: false, message: 'Failed to delete API key' };
  }
}

/**
 * Inserts generated slides into the presentation.
 * @param {Array} slideData - Array of slide data to insert
 * @return {Object} The insertion result
 */
function insertSlides(slideData) {
  try {
    const presentation = SlidesApp.getActivePresentation();
    
    // This is a placeholder for the slide insertion logic
    // You'll implement the actual slide creation here
    
    return {
      success: true,
      message: 'Slides inserted successfully'
    };
  } catch (error) {
    console.error('Error inserting slides:', error);
    return {
      success: false,
      message: 'Failed to insert slides: ' + error.message
    };
  }
} 