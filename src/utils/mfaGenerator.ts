// Dynamic MFA Code Generator
// Generates time-based codes that change periodically

export interface MFACode {
  code: string;
  validUntil: Date;
  timeRemaining: number;
}

class MFAGenerator {
  private static instance: MFAGenerator;
  private currentCode: string = '';
  private validUntil: Date = new Date();
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {
    this.generateNewCode();
    this.startRotation();
  }

  public static getInstance(): MFAGenerator {
    if (!MFAGenerator.instance) {
      MFAGenerator.instance = new MFAGenerator();
    }
    return MFAGenerator.instance;
  }

  private generateNewCode(): void {
    // Generate a 6-digit code based on current time + random element
    const timestamp = Math.floor(Date.now() / 1000);
    const random = Math.floor(Math.random() * 1000);
    const combined = (timestamp + random) % 1000000;
    this.currentCode = combined.toString().padStart(6, '0');
    
    // Code valid for 2 minutes
    this.validUntil = new Date(Date.now() + 2 * 60 * 1000);
  }

  private startRotation(): void {
    // Update code every 2 minutes
    this.intervalId = setInterval(() => {
      this.generateNewCode();
    }, 2 * 60 * 1000);
  }

  public getCurrentCode(): MFACode {
    const timeRemaining = Math.max(0, this.validUntil.getTime() - Date.now());
    
    return {
      code: this.currentCode,
      validUntil: this.validUntil,
      timeRemaining: Math.floor(timeRemaining / 1000)
    };
  }

  public validateCode(inputCode: string): boolean {
    return inputCode === this.currentCode && Date.now() < this.validUntil.getTime();
  }

  public cleanup(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const mfaGenerator = MFAGenerator.getInstance();