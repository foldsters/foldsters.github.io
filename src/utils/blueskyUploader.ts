// blueskyUploader.ts
import { AtpAgent, BlobRef } from '@atproto/api';
import sharp from 'sharp';
import { colors } from './colors';
import { LogoTemplate } from '../../public/images/logo-template';

interface BlueskyCredentials {
  endpoint?: string;
  handle: string;
  password: string;
  did: string;
}

interface UploadResult {
  success: boolean;
  error?: string;
}

// My logo is an SVG, so we need to convert to PNG before uploading
const svgToPngBuffer = async (svgString: string): Promise<Buffer> => {
  try {
    console.log('Starting SVG conversion...');
    
    const pngBuffer = await sharp(Buffer.from(svgString))
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0 }
      })
      .png()
      .toBuffer();
    
    console.log('Successfully converted SVG to PNG, size:', pngBuffer.length, 'bytes');
    return pngBuffer;
  } catch (error) {
    console.error('Error in SVG conversion:', error);
    throw error;
  }
}

// Upload the profile picture to Bluesky
export const uploadProfilePicture = async (
  svg: string, 
  credentials: BlueskyCredentials
): Promise<UploadResult> => {

  // Extract credentials
  const { endpoint, password, did } = credentials;
  
  // Initialize ATP agent
  const client = new AtpAgent({
    service: endpoint || 'https://bsky.social'
  });

  try {

    // Login 
    await client.login({
      identifier: did,
      password: password
    });

    // Convert SVG to PNG
    console.log('Converting SVG to PNG...');
    const pngBuffer = await svgToPngBuffer(svg);
    console.log('Conversion complete, uploading...');
    
    // Upload the PNG buffer
    const uploadResult = await client.com.atproto.repo.uploadBlob(pngBuffer, {
      encoding: 'image/png'
    });

    console.log('Profile picture uploaded successfully');
    console.log(JSON.stringify(uploadResult));

    if (!uploadResult?.data?.blob) {
      throw new Error('Failed to upload image');
    }

    // Get current profile record
    const currentProfileRecord = await client.com.atproto.repo.getRecord({
      repo: did,
      collection: 'app.bsky.actor.profile',
      rkey: 'self'
    });

    console.log('Current profile record:', JSON.stringify(currentProfileRecord, null, 2));

    // Cast record to expected type
    const currentRecord = currentProfileRecord.data.value as {
      $type: string;
      avatar: BlobRef;
      banner: BlobRef;
      displayName: string;
      description: string;
    }

    // Update profile with new avatar
    await client.com.atproto.repo.putRecord({
      repo: did,
      collection: 'app.bsky.actor.profile',
      rkey: 'self',
      swapRecord: currentProfileRecord.data.cid,
      record: {
        ...currentRecord,
        avatar: uploadResult.data.blob,
      }
    });

    console.log('Profile picture uploaded successfully');
    console.log(JSON.stringify(uploadResult));

    return { success: true };
    
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { 
      success: false, 
      error: errorMessage 
    };
  }
}

export const generateAndUploadProfilePicture = async (): Promise<string> => {

  const colorLength = Object.values(colors).length;

  // Picking colors from color palette
  let primaryIndex = Math.floor(Math.random()*colorLength);
  let secondaryIndex = Math.floor(Math.random()*colorLength);

  // Ensure the colors are different enough, could be improved
  while (Math.abs(primaryIndex - secondaryIndex) < (colorLength/3)) {
    primaryIndex = Math.floor(Math.random()*colorLength);
    secondaryIndex = Math.floor(Math.random()*colorLength);
  }

  const primaryColor = Object.values(colors)[primaryIndex];
  const secondaryColor = Object.values(colors)[secondaryIndex];

  const logoParams = { primaryColor, secondaryColor, lineColor: "#222222", hasGayBackground: false, hasBackground: true, strokeWidth: 0.6 };

  console.log("LOGO PARAMS", JSON.stringify(logoParams, null, 2));

  // Generate SVG String
  const svg = LogoTemplate(logoParams);

  // Extract Bluesky credentials from environment variables
  const envVars = {
    endpoint: import.meta.env.BLUESKY_API_ENDPOINT,
    handle: import.meta.env.BLUESKY_HANDLE ?? '',
    password: import.meta.env.BLUESKY_APP_PASSWORD ?? '',
    did: import.meta.env.BLUESKY_DID ?? ''
  };

  // Upload to Bluesky
  const result = await uploadProfilePicture(svg, envVars);

  console.log("UPLOAD PROFILE PIC", JSON.stringify(result));

  if (!result.success) {
    throw new Error(`Failed to upload profile picture: ${result.error}`);
  }

  return svg;
}