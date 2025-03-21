import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { ShortUrlService } from './short-url.service';

@Controller('short-urls')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  async createShortUrl(
    @Body() body: { destination: string; customSlug?: string },
  ) {
    // Example shape: { "destination": "https://example.com", "customSlug": "my-link" }
    const shortUrl = await this.shortUrlService.createShortUrl(
      body.destination,
      body.customSlug,
    );
    return {
      slug: shortUrl.slug,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/short-urls/${shortUrl.slug}`,
      destination: shortUrl.destination,
    };
  }

  @Get('/:slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    try {
      const shortUrl = await this.shortUrlService.findBySlug(slug);
      // For extra-credit, you could increment a "visits" counter here
      return res.redirect(shortUrl.destination);
    } catch (e) {
      throw new NotFoundException('No URL found for slug: ' + slug);
    }
  }
}
