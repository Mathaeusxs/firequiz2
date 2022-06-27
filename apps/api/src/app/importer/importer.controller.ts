import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiEndpoints } from '@libs/app-interfaces/api';

import { JwtAuthGuard } from '@api/shared/auth/guards/jwt-auth.guard';

import { ImporterService } from './importer.service';

@Controller(ApiEndpoints.Importer)
// @UseGuards(JwtAuthGuard)
export class ImporterController {
  constructor(private service: ImporterService) {}

  @Post()
  async importData() {
    return await this.service.startImport();
  }

}
