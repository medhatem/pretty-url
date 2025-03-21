import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrl } from './short-url.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrl)
    private shortUrlRepository: Repository<ShortUrl>,
  ) {}

  async createShortUrl(destination: string, customSlug?: string) {
    // Validate that destination is a proper URL.
    try {
      new URL(destination);
    } catch (error) {
      throw new BadRequestException('Invalid destination URL');
    }

    // If a custom slug is provided, ensure it's not already taken.
    if (customSlug) {
      const existingSlug = await this.shortUrlRepository.findOne({
        where: { slug: customSlug },
      });
      if (existingSlug) {
        throw new BadRequestException('That slug is already in use');
      }
    }

    const slug = customSlug || nanoid(6);

    const newRecord = this.shortUrlRepository.create({
      slug,
      destination,
      // visits starts at 0 by default
      // createdAt will be automatically set by @CreateDateColumn
    });

    return await this.shortUrlRepository.save(newRecord);
  }

  async findBySlug(slug: string): Promise<ShortUrl> {
    const found = await this.shortUrlRepository.findOne({ where: { slug } });
    if (!found) {
      throw new NotFoundException('Short URL not found');
    }

    // Increment visits each time the slug is accessed
    found.visits += 1;
    await this.shortUrlRepository.save(found);

    return found;
  }
}
