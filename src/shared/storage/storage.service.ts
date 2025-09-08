import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync, unlinkSync } from 'fs';
import * as Minio from 'minio';
import { join } from 'path';

@Injectable()
export class StorageService implements OnModuleInit {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const minioConfig = this.configService.get('minio');
    
    this.minioClient = new Minio.Client({
      endPoint: minioConfig.endPoint,
      port: minioConfig.port,
      useSSL: minioConfig.useSSL,
      accessKey: minioConfig.accessKey,
      secretKey: minioConfig.secretKey,
    });

    this.bucketName = minioConfig.bucketName;
  }

  async onModuleInit() {
    await this.ensureBucketExists();
  }

  private async ensureBucketExists(): Promise<void> {
    const exists = await this.minioClient.bucketExists(this.bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
      console.log(`Bucket ${this.bucketName} created successfully`);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const objectName = `${Date.now()}-${file.originalname}`;
    const fileBuffer = readFileSync(join(file.destination, file.filename));
    
    await this.minioClient.putObject(
      this.bucketName,
      objectName,
      fileBuffer,
      file.size,
      {
        'Content-Type': file.mimetype,
        'Original-Name': file.originalname,
      }
    );
    
    unlinkSync(join(file.destination, file.filename));
    return objectName;
  }

  async getFile(objectName: string): Promise<{ stream: NodeJS.ReadableStream; metaData: Minio.BucketItemStat }> {
    const stream = await this.minioClient.getObject(this.bucketName, objectName);
    const metaData = await this.minioClient.statObject(this.bucketName, objectName);
    
    return { stream, metaData };
  }

  async deleteFile(objectName: string): Promise<void> {
    await this.minioClient.removeObject(this.bucketName, objectName);
  }

  async getFileUrl(objectName: string): Promise<string> {
    return this.minioClient.presignedGetObject(this.bucketName, objectName, 24 * 60 * 60);
  }
}