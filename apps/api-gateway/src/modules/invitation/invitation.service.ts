import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';
import {
  CreateInvitationDto,
  CreateBulkInvitationDto,
} from '@libs/dto/invitation/create-invitation.dto';
import { Invitation } from '@libs/entity/invitation.entity';
import { RbacService } from '../rbac/rbac.service';
import { CognitoService } from '../cognito/cognito.service';
import { EmailService } from '../utils/email.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation, 'central_db')
    private invitationRepository: Repository<Invitation>,
    private configService: ConfigService,
    // private rbacService: RbacService,
    // private cognitoService: CognitoService,
    private emailService: EmailService,
  ) {}

  async createInvitation(
    createInvitationDto: CreateInvitationDto,
  ): Promise<{ message: string }> {
    // Check if invitation already exists and is not expired
    const existingInvitation = await this.invitationRepository.findOne({
      where: {
        email: createInvitationDto.email,
        isUsed: false,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (existingInvitation) {
      throw new BadRequestException(
        'An active invitation already exists for this email',
      );
    }

    // Generate invitation token
    const token = uuidv4();
    const expiresAt = addHours(new Date(), 24);

    // Create invitation record
    const invitation = this.invitationRepository.create({
      ...createInvitationDto,
      token,
      expiresAt,
    });

    await this.invitationRepository.save(invitation);

    // Generate invitation link
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const invitationLink = `${frontendUrl}/signup?token=${token}`;

    // Send invitation email
    await this.emailService.sendInvitationEmail({
      to: createInvitationDto.email,
      invitationLink,
      role: createInvitationDto.role,
    });

    return {
      message: 'Invitation sent successfully',
    };
  }

  async validateInvitation(token: string): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({
      where: {
        token,
        isUsed: false,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (!invitation) {
      throw new BadRequestException('Invalid or expired invitation link');
    }

    return invitation;
  }

  async markInvitationAsUsed(token: string): Promise<void> {
    await this.invitationRepository.update({ token }, { isUsed: true });
  }

  async createBulkInvitations(
    createBulkInvitationDto: CreateBulkInvitationDto,
  ): Promise<{
    message: string;
    results: { email: string; status: string; message?: string }[];
  }> {
    const results = [];

    for (const invitationDto of createBulkInvitationDto.invitations) {
      try {
        // Check if invitation already exists and is not expired
        const existingInvitation = await this.invitationRepository.findOne({
          where: {
            email: invitationDto.email,
            isUsed: false,
            expiresAt: MoreThan(new Date()),
          },
        });

        if (existingInvitation) {
          results.push({
            email: invitationDto.email,
            status: 'failed',
            message: 'An active invitation already exists for this email',
          });
          continue;
        }

        // Generate invitation token
        const token = uuidv4();
        const expiresAt = addHours(new Date(), 24);

        // Create invitation record
        const invitation = this.invitationRepository.create({
          ...invitationDto,
          token,
          expiresAt,
        });

        await this.invitationRepository.save(invitation);

        // Generate invitation link
        const frontendUrl = this.configService.get<string>('FRONTEND_URL');
        const invitationLink = `${frontendUrl}/signup?token=${token}`;

        // Send invitation email
        await this.emailService.sendInvitationEmail({
          to: invitationDto.email,
          invitationLink,
          role: invitationDto.role,
        });

        results.push({
          email: invitationDto.email,
          status: 'success',
        });
      } catch (error) {
        results.push({
          email: invitationDto.email,
          status: 'failed',
          message: error.message,
        });
      }
    }

    return {
      message: 'Bulk invitation process completed',
      results,
    };
  }
}
