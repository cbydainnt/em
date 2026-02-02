// controllers/admin/report.admin.controller.ts
import { Controller, Get, Put, Post, Body, Param, Query, UseGuards, Req, BadRequestException } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/login/jwt/jwt-auth.guard';

import { UpdateReportStatusDto, AddReportCommentDto } from '../dto/create-report.dto';
import { ReportService } from '../report.service';

@Controller('admin/reports')
@UseGuards(JwtAuthGuard)
export class AdminReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getReports(@Query('page') page: string, @Query('limit') limit: string, @Query('status') status: string, @Query('type') type: string, @Query('priority') priority: string, @Query('search') search: string, @Query('courseId') courseId: string, @Query('userId') userId: string) {
    try {
      const filters: any = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
      };

      if (status) filters.status = parseInt(status);
      if (type) filters.report_type = parseInt(type);
      if (priority) filters.priority = parseInt(priority);
      if (courseId) filters.course_id = courseId;
      if (userId) filters.user_id = userId;
      if (search) filters.search = search;

      return await this.reportService.findAll(filters);
    } catch (err: any) {
      console.error('❌ Error fetching reports:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Get('statistics')
  async getStatistics(@Query('period') period: string) {
    try {
      return await this.reportService.getStatistics(period as 'day' | 'week' | 'month' | 'year');
    } catch (err: any) {
      console.error('❌ Error fetching statistics:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Get('dashboard-stats')
  async getDashboardStats() {
    try {
      const totalReports = await this.reportService.getTotalCount();
      const pendingReports = await this.reportService.getCountByStatus(1);
      const inReviewReports = await this.reportService.getCountByStatus(2);
      const resolvedReports = await this.reportService.getCountByStatus(3);
      const rejectedReports = await this.reportService.getCountByStatus(4);

      return {
        total: totalReports,
        pending: pendingReports,
        inReview: inReviewReports,
        resolved: resolvedReports,
        rejected: rejectedReports,
      };
    } catch (err: any) {
      console.error('❌ Error fetching dashboard stats:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  async getReport(@Param('id') id: string) {
    try {
      const report = await this.reportService.findOne(id);
      if (!report) {
        throw new BadRequestException('Report not found');
      }
      return report;
    } catch (err: any) {
      console.error('❌ Error fetching report:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id/comments')
  async getComments(@Param('id') id: string) {
    try {
      return await this.reportService.getComments(id);
    } catch (err: any) {
      console.error('❌ Error fetching comments:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Post(':id/comments')
  async addComment(@Param('id') id: string, @Body() body: AddReportCommentDto, @Req() req: any) {
    try {
      return await this.reportService.addComment(id, req.user.id, body);
    } catch (err: any) {
      console.error('❌ Error adding comment:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: UpdateReportStatusDto, @Req() req: any) {
    try {
      return await this.reportService.updateStatus(id, req.user.id, body);
    } catch (err: any) {
      console.error('❌ Error updating status:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Post(':id/start-review')
  async startReview(@Param('id') id: string, @Req() req: any) {
    try {
      return await this.reportService.startReview(id, req.user.id);
    } catch (err: any) {
      console.error('❌ Error starting review:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Put(':id/priority')
  async updatePriority(@Param('id') id: string, @Body() body: { priority: number }, @Req() req: any) {
    try {
      const report = await this.reportService.findOne(id);
      if (!report) {
        throw new BadRequestException('Report not found');
      }

      if (body.priority < 1 || body.priority > 4) {
        throw new BadRequestException('Priority must be between 1 and 4');
      }

      return await this.reportService.updatePriority(id, body.priority);
    } catch (err: any) {
      console.error('❌ Error updating priority:', err);
      throw new BadRequestException(err.message);
    }
  }
  @Post(':id/assign')
  async assignToAdmin(@Param('id') id: string, @Body() body: { adminId: string }, @Req() req: any) {
    try {
      return await this.reportService.assignToAdmin(id, body.adminId, req.user.id);
    } catch (err: any) {
      console.error('❌ Error assigning report:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Get('export/csv')
  async exportToCsv(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    try {
      const reports = await this.reportService.getReportsForExport(startDate, endDate);

      // Convert to CSV format
      const csvData = await this.reportService.convertToCsv(reports);

      return {
        data: csvData,
        filename: `reports_${new Date().toISOString().split('T')[0]}.csv`,
      };
    } catch (err: any) {
      console.error('❌ Error exporting reports:', err);
      throw new BadRequestException(err.message);
    }
  }
}
