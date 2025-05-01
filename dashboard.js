document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const uploadPrompt = document.getElementById('upload-prompt');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const clearImageBtn = document.getElementById('clear-image');
    const canvas = document.getElementById('canvas');
    const errorContainer = document.getElementById('error-container');
    const processingIndicator = document.getElementById('processing-indicator');
    const colorsContainer = document.getElementById('colors-container');
    const noColorsMessage = document.getElementById('no-colors-message');
    const exportPaletteBtn = document.getElementById('export-palette');
    const tooltip = document.getElementById('tooltip');

    // Comprehensive color name and usage mapping
    const colorAssociations = {
        // Reds (expanded)
        'FF0000': { name: 'Red', usage: 'Warnings, passion, energy' },
        'CB4154': { name: 'Brick Red', usage: 'Strength, durability' },
        'FF5349': { name: 'Red Orange', usage: 'Vibrance, excitement' },
        'FF4500': { name: 'Orange Red', usage: 'Aggression, dominance' },
        'FF6F61': { name: 'Coral Reef', usage: 'Warmth, tropical' },
        'FF6961': { name: 'Pink Red', usage: 'Playful energy' },
        'E32636': { name: 'Alizarin Crimson', usage: 'Artistic, traditional' },
        'C32148': { name: 'Maroon', usage: 'Sophistication, control' },
        'B22222': { name: 'Firebrick', usage: 'Warmth, stability' },
        '800000': { name: 'Dark Maroon', usage: 'Elegance, formality' },
        'E52B50': { name: 'Amaranth', usage: 'Romance, vibrancy' },
        'FF0038': { name: 'Carmine Red', usage: 'Intensity, drama' },
        'FF0800': { name: 'Candy Apple Red', usage: 'Speed, excitement' },
        'FF2800': { name: 'Ferrari Red', usage: 'Luxury, performance' },
        'D70040': { name: 'Ruby Red', usage: 'Passion, preciousness' },
        'FF2400': { name: 'Scarlet', usage: 'Attention, importance' },
        'ED1C24': { name: 'Red Pigment', usage: 'Boldness, impact' },
        'FE2712': { name: 'Red Ribbon', usage: 'Awareness, support' },
        'C40233': { name: 'Red NCS', usage: 'Modern, clean' },
        '9F111B': { name: 'Tosca Red', usage: 'Elegance, depth' },
        'A81C07': { name: 'Rufous Red', usage: 'Earthiness, warmth' },
        '850101': { name: 'Dark Candy Apple Red', usage: 'Classic, rich' },
        '65000B': { name: 'Rosewood', usage: 'Luxury, tradition' },
        '560319': { name: 'Dark Scarlet', usage: 'Mystery, depth' },
        '3D0C02': { name: 'Black Bean', usage: 'Earthiness, strength' },

        // Pinks (expanded)
        'FFC0CB': { name: 'Pink', usage: 'Love, femininity' },
        'FF9966': { name: 'Atomic Tangerine', usage: 'Energy, fun' },
        'FF6EC7': { name: 'Magic Mint', usage: 'Playfulness, whimsy' },
        'FF69B4': { name: 'Hot Pink', usage: 'Youth, excitement' },
        'FF1493': { name: 'Deep Pink', usage: 'Bold femininity' },
        'FF33CC': { name: 'Razzle Dazzle Rose', usage: 'Vibrancy, fun' },
        'FC74FD': { name: 'Pink Flamingo', usage: 'Tropical, playful' },
        'FF66FF': { name: 'Pink Fluorite', usage: 'Magic, fantasy' },
        'FD3F92': { name: 'French Fuchsia', usage: 'Elegant passion' },
        'DE3163': { name: 'Cerise Red', usage: 'Joy, celebration' },
        'EC3B83': { name: 'Crimson Glory', usage: 'Romantic, deep' },
        'FF0090': { name: 'Magenta Process', usage: 'Modern, digital' },
        'F400A1': { name: 'Hollywood Cerise', usage: 'Glamour, drama' },
        'E30B5C': { name: 'Raspberry', usage: 'Sweetness, energy' },
        'CA2C92': { name: 'Royal Fuchsia', usage: 'Regal, luxurious' },
        'C71585': { name: 'Medium Violet Red', usage: 'Classic femininity' },
        'B3446C': { name: 'Raspberry Rose', usage: 'Vintage, romantic' },
        '915F6D': { name: 'Mauve Taupe', usage: 'Muted elegance' },
        '872657': { name: 'Dark Raspberry', usage: 'Sophisticated passion' },
        '614051': { name: 'Eggplant', usage: 'Mystery, depth' },
        '4D0F28': { name: 'Dark Sienna', usage: 'Rich, grounded' },
        '3B000B': { name: 'Dark Chocolate', usage: 'Luxury, depth' },

        // Oranges (expanded)
        'FFA500': { name: 'Orange', usage: 'Creativity, enthusiasm' },
        'FF8C00': { name: 'Dark Orange', usage: 'Vitality, endurance' },
        'FF7F50': { name: 'Coral', usage: 'Life, energy' },
        'FF7538': { name: 'Orange Peel', usage: 'Freshness, zest' },
        'FF5800': { name: 'International Orange', usage: 'Visibility, safety' },
        'FF5349': { name: 'Red Orange', usage: 'Excitement, action' },
        'FF681F': { name: 'Orange', usage: 'Friendliness, approachable' },
        'FF9933': { name: 'Deep Saffron', usage: 'Spice, warmth' },
        'FF8243': { name: 'Mango Tango', usage: 'Tropical, juicy' },
        'FFA343': { name: 'Neon Carrot', usage: 'Vibrancy, fun' },
        'FFAE42': { name: 'Yellow Orange', usage: 'Sunshine, happiness' },
        'FFB347': { name: 'Pastel Orange', usage: 'Soft energy' },
        'FFCC33': { name: 'Sunglow', usage: 'Radiance, positivity' },
        'FFA700': { name: 'Chrome Yellow', usage: 'Attention, brightness' },
        'FF8F00': { name: 'Dark Amber', usage: 'Richness, depth' },
        'FF6E4A': { name: 'Outrageous Orange', usage: 'Playful, energetic' },
        'FF5F1F': { name: 'Vivid Orange', usage: 'Intensity, action' },
        'FF3F34': { name: 'Red Orange', usage: 'Danger, excitement' },
        'E34234': { name: 'Cinnabar', usage: 'Earthiness, tradition' },
        'CD5700': { name: 'Tenné', usage: 'Autumn, warmth' },
        'CC5500': { name: 'Burnt Orange', usage: 'Harvest, comfort' },
        'B7410E': { name: 'Rust', usage: 'Earthiness, durability' },
        'A0522D': { name: 'Sienna', usage: 'Natural, rustic' },
        '8B4513': { name: 'Saddle Brown', usage: 'Western, traditional' },
        '7B3F00': { name: 'Chocolate', usage: 'Comfort, richness' },
        '5D2906': { name: 'Seal Brown', usage: 'Stability, reliability' },

        // Yellows (expanded)
        'FFFF00': { name: 'Yellow', usage: 'Happiness, optimism' },
        'FFEF00': { name: 'Canary Yellow', usage: 'Brightness, energy' },
        'FFD300': { name: 'Cyber Yellow', usage: 'Digital, modern' },
        'FFD700': { name: 'Gold', usage: 'Luxury, wealth' },
        'FCE883': { name: 'Lemon Yellow', usage: 'Freshness, clarity' },
        'FFF44F': { name: 'Lemon Glacier', usage: 'Vibrancy, intensity' },
        'FFE302': { name: 'Yellow Rose', usage: 'Friendship, joy' },
        'FFDB58': { name: 'Mustard', usage: 'Warmth, vintage' },
        'FFCC00': { name: 'Golden Poppy', usage: 'California, sunshine' },
        'FFC40C': { name: 'Mikado Yellow', usage: 'Japanese tradition' },
        'FFC000': { name: 'Amber', usage: 'Warmth, energy' },
        'FFBD5F': { name: 'Koromiko', usage: 'Soft warmth' },
        'FFAA1D': { name: 'Bright Yellow', usage: 'Visibility, cheer' },
        'FFA812': { name: 'Dark Tangerine', usage: 'Energy, citrus' },
        'FF9933': { name: 'Deep Saffron', usage: 'Indian tradition' },
        'FF8C00': { name: 'Dark Orange', usage: 'Autumn, harvest' },
        'FFDE7D': { name: 'Jasmine', usage: 'Delicate, floral' },
        'FADA5E': { name: 'Royal Yellow', usage: 'Regal, rich' },
        'F5E050': { name: 'Minion Yellow', usage: 'Playful, fun' },
        'EEDC82': { name: 'Flax', usage: 'Natural, organic' },
        'E3A857': { name: 'Indian Yellow', usage: 'Traditional, earthy' },
        'D4AF37': { name: 'Metallic Gold', usage: 'Luxury, prestige' },
        'C5B358': { name: 'Vegas Gold', usage: 'Glitz, glamour' },
        'B8860B': { name: 'Dark Goldenrod', usage: 'Antique, traditional' },
        '996515': { name: 'Golden Brown', usage: 'Earthiness, stability' },
        '8B8000': { name: 'Dark Yellow', usage: 'Caution, aged' },
        '665D1E': { name: 'Antique Bronze', usage: 'Vintage, classic' },
        '4C3D08': { name: 'Deep Bronze', usage: 'Strength, durability' },

        // Greens (expanded)
        '00FF00': { name: 'Green', usage: 'Nature, growth' },
        '32CD32': { name: 'Lime Green', usage: 'Freshness, vibrancy' },
        '00FA9A': { name: 'Medium Spring Green', usage: 'Renewal, vitality' },
        '66FF00': { name: 'Bright Green', usage: 'Energy, neon' },
        '7FFF00': { name: 'Chartreuse', usage: 'Visibility, modern' },
        'ADFF2F': { name: 'Green Yellow', usage: 'Spring, freshness' },
        '9ACD32': { name: 'Yellow Green', usage: 'Natural, organic' },
        '00FF7F': { name: 'Spring Green', usage: 'New beginnings' },
        '3CB371': { name: 'Medium Sea Green', usage: 'Ocean, calm' },
        '2E8B57': { name: 'Sea Green', usage: 'Depth, tranquility' },
        '228B22': { name: 'Forest Green', usage: 'Nature, harmony' },
        '008000': { name: 'Office Green', usage: 'Business, finance' },
        '006400': { name: 'Dark Green', usage: 'Prestige, stability' },
        '097969': { name: 'Paolo Veronese Green', usage: 'Artistic, rich' },
        '1B4D3E': { name: 'Brunswick Green', usage: 'Traditional, formal' },
        '355E3B': { name: 'Hunter Green', usage: 'Outdoors, rugged' },
        '4B5320': { name: 'Army Green', usage: 'Military, durable' },
        '8F9779': { name: 'Artichoke', usage: 'Natural, muted' },
        '568203': { name: 'Avocado', usage: 'Healthy, organic' },
        '4CBB17': { name: 'Kelly Green', usage: 'Irish, lucky' },
        '3A9D23': { name: 'Wageningen Green', usage: 'Dutch tradition' },
        '00A877': { name: 'Green Munsell', usage: 'Precision, clarity' },
        '009E60': { name: 'Shamrock Green', usage: 'Irish, festive' },
        '00AD83': { name: 'Persian Green', usage: 'Middle Eastern' },
        '5F8575': { name: 'Wintergreen Dream', usage: 'Cool, calm' },
        '317873': { name: 'Myrtle Green', usage: 'Classic, botanical' },
        '00755E': { name: 'Tropical Rain Forest', usage: 'Lush, vibrant' },
        '004953': { name: 'Midnight Green', usage: 'Deep, professional' },
        '1A2421': { name: 'Dark Jungle Green', usage: 'Mystery, depth' },

        // Blues (expanded)
        '0000FF': { name: 'Blue', usage: 'Trust, calm' },
        '4169E1': { name: 'Royal Blue', usage: 'Royalty, richness' },
        '1E90FF': { name: 'Dodger Blue', usage: 'Clarity, freshness' },
        '00BFFF': { name: 'Deep Sky Blue', usage: 'Openness, freedom' },
        '87CEEB': { name: 'Sky Blue', usage: 'Peace, serenity' },
        '4682B4': { name: 'Steel Blue', usage: 'Strength, reliability' },
        '5D8AA8': { name: 'Air Force Blue', usage: 'Professional, official' },
        '007FFF': { name: 'Azure', usage: 'Technology, clarity' },
        '0038A8': { name: 'Royal Azure', usage: 'Regal, traditional' },
        '002366': { name: 'Midnight Blue', usage: 'Formal, elegant' },
        '000080': { name: 'Navy Blue', usage: 'Authority, trust' },
        '00008B': { name: 'Dark Blue', usage: 'Depth, expertise' },
        '0000CD': { name: 'Medium Blue', usage: 'Balance, stability' },
        '0047AB': { name: 'Cobalt Blue', usage: 'Artistic, rich' },
        '0066CC': { name: 'Medium Navy Blue', usage: 'Professional, corporate' },
        '008E97': { name: 'Blue Green', usage: 'Tropical, refreshing' },
        '00CCCC': { name: 'Robin Egg Blue', usage: 'Delicate, spring' },
        '0F52BA': { name: 'Sapphire', usage: 'Precious, valuable' },
        '1CA9C9': { name: 'Pacific Blue', usage: 'Ocean, vast' },
        '2A52BE': { name: 'Cerulean Blue', usage: 'Sky, openness' },
        '3B7A57': { name: 'Amazon', usage: 'Natural, lush' },
        '4B4E6D': { name: 'Independence', usage: 'Serious, professional' },
        '5D8AA8': { name: 'Air Superiority Blue', usage: 'Aviation, precision' },
        '6F00FF': { name: 'Electric Indigo', usage: 'Vibrancy, energy' },
        '7DF9FF': { name: 'Electric Blue', usage: 'Futuristic, tech' },
        '89CFF0': { name: 'Baby Blue', usage: 'Softness, innocence' },
        'A7C7E7': { name: 'Pastel Blue', usage: 'Calm, gentle' },
        'B2FFFF': { name: 'Celeste', usage: 'Heavenly, light' },
        'C9FFE5': { name: 'Aero Blue', usage: 'Fresh, clean' },
        'D1EDF2': { name: 'Light Cyan', usage: 'Soft, airy' },
        'E0FFFF': { name: 'Light Blue', usage: 'Delicate, peaceful' },
        'F0F8FF': { name: 'Alice Blue', usage: 'Soft, feminine' },
        '191970': { name: 'Midnight Blue', usage: 'Deep, mysterious' },
        '1D2951': { name: 'Space Cadet', usage: 'Cosmic, deep' },
        '002E63': { name: 'Cool Black', usage: 'Professional, serious' },
        '003153': { name: 'Prussian Blue', usage: 'Historical, artistic' },
        '003366': { name: 'Dark Midnight Blue', usage: 'Corporate, reliable' },

        // Purples (expanded)
        '800080': { name: 'Purple', usage: 'Royalty, luxury' },
        '9400D3': { name: 'Dark Violet', usage: 'Mystery, depth' },
        '9932CC': { name: 'Dark Orchid', usage: 'Exotic, rich' },
        '8A2BE2': { name: 'Blue Violet', usage: 'Spiritual, creative' },
        '9370DB': { name: 'Medium Purple', usage: 'Soft, mystical' },
        'DA70D6': { name: 'Orchid', usage: 'Delicate, feminine' },
        'D8BFD8': { name: 'Thistle', usage: 'Soft, vintage' },
        'DDA0DD': { name: 'Plum', usage: 'Mature, sophisticated' },
        'EE82EE': { name: 'Violet', usage: 'Romantic, gentle' },
        'FF00FF': { name: 'Magenta', usage: 'Bold, electric' },
        'BA55D3': { name: 'Medium Orchid', usage: 'Creative, artistic' },
        '8B008B': { name: 'Dark Magenta', usage: 'Power, intensity' },
        '9400D3': { name: 'Electric Purple', usage: 'Vibrancy, energy' },
        '4B0082': { name: 'Indigo', usage: 'Intuition, wisdom' },
        '483D8B': { name: 'Dark Slate Blue', usage: 'Professional, serious' },
        '6A5ACD': { name: 'Slate Blue', usage: 'Reliable, calm' },
        '7B68EE': { name: 'Medium Slate Blue', usage: 'Balanced, peaceful' },
        '8B00FF': { name: 'Electric Violet', usage: 'Vivid, intense' },
        'A020F0': { name: 'Purple X11', usage: 'Digital, modern' },
        'BF00FF': { name: 'Electric Purple', usage: 'Neon, vibrant' },
        'CCCCFF': { name: 'Lavender Blue', usage: 'Soft, dreamy' },
        'E6E6FA': { name: 'Lavender', usage: 'Feminine, gentle' },
        'F8F8FF': { name: 'Ghost White', usage: 'Clean, pure' },
        'C9A0DC': { name: 'Wisteria', usage: 'Romantic, floral' },
        'B57EDC': { name: 'Lavender Purple', usage: 'Soft, vintage' },
        '9966CC': { name: 'Amethyst', usage: 'Spiritual, calming' },
        '7851A9': { name: 'Royal Purple', usage: 'Regal, luxurious' },
        '614051': { name: 'Eggplant', usage: 'Sophisticated, deep' },
        '301934': { name: 'Dark Purple', usage: 'Mysterious, gothic' },
        '4B0150': { name: 'Dark Magenta', usage: 'Power, intensity' },
        '36013F': { name: 'Deep Purple', usage: 'Luxury, mystery' },
        '2E003E': { name: 'Midnight Purple', usage: 'Exclusive, premium' },

        // Browns (expanded)
        'A52A2A': { name: 'Brown', usage: 'Earth, reliability' },
        '8B4513': { name: 'Saddle Brown', usage: 'Western, traditional' },
        'A0522D': { name: 'Sienna', usage: 'Natural, rustic' },
        'CD853F': { name: 'Peru', usage: 'Earthiness, simplicity' },
        'D2691E': { name: 'Chocolate', usage: 'Warmth, comfort' },
        'B87333': { name: 'Copper', usage: 'Metallic, warm' },
        'C19A6B': { name: 'Camel', usage: 'Neutral, natural' },
        'D2B48C': { name: 'Tan', usage: 'Soft, neutral' },
        'F5DEB3': { name: 'Wheat', usage: 'Comfort, relaxation' },
        'DEB887': { name: 'Burlywood', usage: 'Natural, warmth' },
        'BC8F8F': { name: 'Rosy Brown', usage: 'Soft, feminine' },
        'C4A484': { name: 'Tumbleweed', usage: 'Desert, warm' },
        'C8AD7F': { name: 'Light French Beige', usage: 'Elegant, neutral' },
        'D1B26F': { name: 'Tan', usage: 'Natural, organic' },
        'E6C200': { name: 'Chinese Gold', usage: 'Asian, traditional' },
        'E49B0F': { name: 'Gamboge', usage: 'Golden, rich' },
        'B8860B': { name: 'Dark Goldenrod', usage: 'Antique, traditional' },
        'DAA520': { name: 'Goldenrod', usage: 'Happiness, energy' },
        'B5651D': { name: 'Light Brown', usage: 'Natural, earthy' },
        '9F8170': { name: 'Beaver', usage: 'Natural, neutral' },
        '6F4E37': { name: 'Coffee', usage: 'Rich, warm' },
        '5D3954': { name: 'Dark Byzantium', usage: 'Mysterious, deep' },
        '4A3C30': { name: 'Dark Lava', usage: 'Earth, strength' },
        '3D2B1F': { name: 'Bistre', usage: 'Artistic, traditional' },
        '321414': { name: 'Dark Sienna', usage: 'Rich, grounded' },
        '1A1110': { name: 'Licorice', usage: 'Deep, intense' },

        // Neutrals (expanded)
        'FFFFFF': { name: 'White', usage: 'Purity, cleanliness' },
        'F5F5F5': { name: 'White Smoke', usage: 'Minimal, clean' },
        'E5E5E5': { name: 'Platinum', usage: 'Luxury, modern' },
        'D3D3D3': { name: 'Light Gray', usage: 'Neutral, calm' },
        'C0C0C0': { name: 'Silver', usage: 'Modern, sleek' },
        'A9A9A9': { name: 'Dark Gray', usage: 'Serious, professional' },
        '808080': { name: 'Gray', usage: 'Balance, neutral' },
        '696969': { name: 'Dim Gray', usage: 'Solidity, reliability' },
        '778899': { name: 'Light Slate Gray', usage: 'Cool, professional' },
        '708090': { name: 'Slate Gray', usage: 'Serious, corporate' },
        '2F4F4F': { name: 'Dark Slate Gray', usage: 'Deep, professional' },
        '000000': { name: 'Black', usage: 'Elegance, power' },
        '0A0A0A': { name: 'Rich Black', usage: 'Deep, premium' },
        '1C1C1C': { name: 'Eerie Black', usage: 'Mysterious, dark' },
        '282828': { name: 'Gunmetal', usage: 'Industrial, strong' },
        '36454F': { name: 'Charcoal', usage: 'Sophisticated, modern' },
        '3B3C36': { name: 'Black Olive', usage: 'Natural, muted' },
        '454545': { name: 'Medium Black', usage: 'Neutral, balanced' },
        '555555': { name: 'Davy Grey', usage: 'Professional, serious' },
        '6B6B6B': { name: 'Granite Gray', usage: 'Natural, strong' },
        '7C7C7C': { name: 'Battleship Gray', usage: 'Industrial, durable' },
        '8B8B8B': { name: 'Middle Gray', usage: 'Neutral, balanced' },
        '9E9E9E': { name: 'Spanish Gray', usage: 'Soft, neutral' },
        'B2BEB5': { name: 'Ash Gray', usage: 'Natural, muted' },
        'C5C5C5': { name: 'Pale Silver', usage: 'Soft, light' },
        'D1D1D1': { name: 'Light Gray', usage: 'Minimal, clean' },
        'DDDDDD': { name: 'Gainsboro', usage: 'Neutral, balanced' },
        'E5E4E2': { name: 'Platinum', usage: 'Luxury, premium' },
        'F0F0F0': { name: 'Cultured Pearl', usage: 'Soft, elegant' },
        'FAFAFA': { name: 'Snow White', usage: 'Pure, clean' }
    };

    // State variables
    let detectedColors = [];

    // Event Listeners (remain the same as your original code)
    dropArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('drop', handleDrop);
    clearImageBtn.addEventListener('click', clearImage);
    exportPaletteBtn.addEventListener('click', exportPalette);

    // Handle file selection
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    }

    // Handle drag over
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.add('active');
    }

    // Handle drop
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.remove('active');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    }

    // Process the selected file
    function processFile(file) {
        // Clear previous errors
        errorContainer.classList.add('hidden');
        errorContainer.textContent = '';
        
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            showError('Please upload an image file');
            return;
        }
        
        // Read the file
        const reader = new FileReader();
        reader.onload = function(e) {
            // Show image preview
            previewImg.src = e.target.result;
            uploadPrompt.classList.add('hidden');
            imagePreview.classList.remove('hidden');
            
            // Process the image to detect colors
            detectColors(e.target.result);
        };
        reader.onerror = function() {
            showError('Error reading the file');
        };
        reader.readAsDataURL(file);
    }

    // Clear the image and reset
    function clearImage(e) {
        e.stopPropagation();
        previewImg.src = '';
        uploadPrompt.classList.remove('hidden');
        imagePreview.classList.add('hidden');
        fileInput.value = '';
        colorsContainer.innerHTML = '';
        colorsContainer.appendChild(noColorsMessage);
        noColorsMessage.classList.remove('hidden');
        exportPaletteBtn.classList.add('hidden');
        detectedColors = [];
    }

    // Show error message
    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
    }

    // Detect colors in the image
    function detectColors(imageSrc) {
        // Show processing indicator
        processingIndicator.classList.remove('hidden');
        noColorsMessage.classList.add('hidden');
        
        // Create image object
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = function() {
            // Set canvas dimensions
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image on canvas
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            
            // Get image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Map to store unique colors and their count
            const colorMap = new Map();
            const totalPixels = canvas.width * canvas.height;
            
            // Process each pixel
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Skip transparent pixels
                if (data[i + 3] < 128) continue;
                
                // Convert to hex
                const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
                
                // Count occurrences
                colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
            }
            
            // Convert to array and sort by frequency
            detectedColors = Array.from(colorMap.entries())
                .map(([hex, count]) => {
                    const hexWithoutHash = hex.substring(1);
                    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
                    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
                    const b = parseInt(hexWithoutHash.substring(4, 6), 16);
                    const rgb = `rgb(${r}, ${g}, ${b})`;
                    const colorInfo = findClosestColor(hexWithoutHash);
                    const percentage = (count / totalPixels) * 100;
                    
                    return {
                        hex,
                        rgb,
                        name: colorInfo.name,
                        usage: colorInfo.usage,
                        percentage
                    };
                })
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 20); // Limit to top 20 colors
            
            // Display the colors
            displayColors();
            
            // Hide processing indicator
            processingIndicator.classList.add('hidden');
            
            // Show export button
            exportPaletteBtn.classList.remove('hidden');
        };
        
        img.onerror = function() {
            processingIndicator.classList.add('hidden');
            showError('Failed to load image');
        };
        
        img.src = imageSrc;
    }

    // Find the closest color name
    function findClosestColor(hex) {
        // Convert to uppercase for comparison
        hex = hex.toUpperCase();
        
        // If exact match exists
        if (colorAssociations[hex]) {
            return colorAssociations[hex];
        }
        
        // Convert hex to RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        // Find closest color by RGB distance
        let minDistance = Infinity;
        let closestColor = { name: 'Custom Color', usage: 'No information available' };
        
        Object.entries(colorAssociations).forEach(([colorHex, info]) => {
            const cr = parseInt(colorHex.substring(0, 2), 16);
            const cg = parseInt(colorHex.substring(2, 4), 16);
            const cb = parseInt(colorHex.substring(4, 6), 16);
            
            // Calculate Euclidean distance in RGB space
            const distance = Math.sqrt(Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2));
            
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = info;
            }
        });
        
        return closestColor;
    }

    // Display the detected colors
    function displayColors() {
        // Clear previous content
        colorsContainer.innerHTML = '';
        
        if (detectedColors.length === 0) {
            colorsContainer.appendChild(noColorsMessage);
            return;
        }
        
        // Create color cards
        detectedColors.forEach(color => {
            const colorCard = document.createElement('div');
            colorCard.className = 'color-card';
            
            colorCard.innerHTML = `
                <div class="color-swatch" style="background-color: ${color.hex}"></div>
                <div class="color-info">
                    <div class="color-name">
                        <h3>${color.name}</h3>
                        <span class="color-percentage">(${color.percentage.toFixed(1)}%)</span>
                    </div>
                    <div class="color-codes">
                        <div class="color-code" data-value="${color.hex}">
                            <span class="color-code-value">${color.hex}</span>
                            <span class="color-code-copy">Click to copy</span>
                        </div>
                        <div class="color-code" data-value="${color.rgb}">
                            <span class="color-code-value">${color.rgb}</span>
                            <span class="color-code-copy">Click to copy</span>
                        </div>
                    </div>
                    <div class="color-usage">
                        <i class="fas fa-info-circle"></i>
                        <span>${color.usage}</span>
                    </div>
                </div>
            `;
            
            colorsContainer.appendChild(colorCard);
            
            // Add click event to copy buttons
            const copyButtons = colorCard.querySelectorAll('.color-code');
            copyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    copyToClipboard(value);
                    showTooltip(this, 'Copied!');
                });
            });
        });
    }

    // Copy to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    // Show tooltip
    function showTooltip(element, message) {
        const rect = element.getBoundingClientRect();
        
        tooltip.textContent = message;
        tooltip.style.top = `${rect.top - 30}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - 30}px`;
        tooltip.classList.remove('hidden');
        
        setTimeout(() => {
            tooltip.classList.add('hidden');
        }, 1500);
    }

    // Export color palette
    function exportPalette() {
        if (detectedColors.length === 0) return;
        
        let csvContent = 'Color Name,Hex Code,RGB Value,Common Usage,Percentage\n';
        
        detectedColors.forEach(color => {
            csvContent += `${color.name},${color.hex},${color.rgb},"${color.usage}",${color.percentage.toFixed(2)}%\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'color_palette.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});