/**
 * Creates a custom menu in Google Slides when the document is opened.
 */
function onOpen() {
  SlidesApp.getUi()
    .createMenu('🎯 Slide Generator')
    .addItem('Open Generator', 'showSlideGeneratorSidebar')
    .addSeparator()
    .addItem('About', 'showAbout')
    .addToUi();
}

/**
 * Shows the Slide Generator sidebar.
 */
function showSlideGeneratorSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Slide Generator')
    .setWidth(350); // Set width to accommodate the design

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

/**
 * Saves an API key securely in the user's script properties.
 * @param {string} provider - The API provider name
 * @param {string} apiKey - The API key to save
 * @return {Object} The save result
 */
function saveApiKey(provider, apiKey) {
  try {
    // Get user's script properties
    const userProperties = PropertiesService.getUserProperties();
    
    // Save the API key with the provider as the key
    userProperties.setProperty('apiKey_' + provider, apiKey);
    
    return {
      success: true,
      message: 'API key saved successfully'
    };
  } catch (error) {
    console.error('Error saving API key:', error);
    return {
      success: false,
      message: 'Failed to save API key: ' + error.message
    };
  }
}

/**
 * Retrieves a saved API key for a provider.
 * @param {string} provider - The API provider name
 * @return {Object} The retrieval result
 */
function getApiKey(provider) {
  try {
    const userProperties = PropertiesService.getUserProperties();
    const apiKey = userProperties.getProperty('apiKey_' + provider);
    
    return {
      success: true,
      apiKey: apiKey || ''
    };
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return {
      success: false,
      message: 'Failed to retrieve API key: ' + error.message
    };
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

/**
 * Updates the user's model selection preference.
 * @param {string} model - The selected model
 * @return {Object} The update result
 */
function updateModelPreference(model) {
  try {
    const userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty('preferred_model', model);
    
    return {
      success: true,
      message: 'Model preference updated'
    };
  } catch (error) {
    console.error('Error updating model preference:', error);
    return {
      success: false,
      message: 'Failed to update model preference: ' + error.message
    };
  }
}

/**
 * Gets the user's saved model preference.
 * @return {Object} The preference result
 */
function getModelPreference() {
  try {
    const userProperties = PropertiesService.getUserProperties();
    const model = userProperties.getProperty('preferred_model') || 'gpt-3.5-turbo';
    
    return {
      success: true,
      model: model
    };
  } catch (error) {
    console.error('Error getting model preference:', error);
    return {
      success: false,
      message: 'Failed to get model preference: ' + error.message
    };
  }
} 