import { Plugins } from "@capacitor/core";

export class IosUtils {
    static checkBrow = (deviceName: string): boolean => {
        // Так как бровь пояилась только у устройств начиная с iphone 10
        // то в имени должна быть 1, SE не берем в счет
    
        return deviceName.includes('1');
    }
}