import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { SupabaseService } from 'src/supabase/supabase.service';

export enum ImageFolder {
  PROFILE_PICTURES = 'profilePictures',
  MOVIES = 'movies',
  SONGS = 'songs',
}

// const extensionByFolder = {
//   [ImageFolder.PROFILE_PICTURES]: 'webp',
//   [ImageFolder.MOVIES]: 'webp',
//   [ImageFolder.SONGS]: 'webp',
// } as const;

@Injectable()
export class ImageService {
  constructor(private supabase: SupabaseService) {}

  async compressImage(file: Express.Multer.File) {
    return await sharp(file.buffer)
      .resize(150, 150, { fit: 'cover' }) // optional
      .webp({ quality: 80 }) // compression
      .toBuffer();
  }

  async uploadProfilePicture(file: Express.Multer.File) {
    const compressedImage = await this.compressImage(file);
    const fileName = `${randomUUID()}.webp`;
    const { data, error } = await this.supabase.client.storage
      .from(ImageFolder.PROFILE_PICTURES)
      .upload(fileName, compressedImage, {
        contentType: 'image/webp',
      });

    return {
      fileName: data?.path,
      data,
      error,
    };
  }
}
