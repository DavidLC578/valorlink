import { motion } from 'framer-motion';
import { StepProps } from '@/types/types';
import regions from '@/libs/data/regions.json'

export default function RegionStep({ data, setData, next }: StepProps) {
    const handleSelect = (regionId: string) => {
        setData({ ...data, region: regionId });
        next();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Select your region</h2>
                <p className="text-gray-400">Where do you usually play?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {regions.map((region) => (
                    <motion.button
                        key={region.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(region.id)}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${data.region === region.id
                            ? 'bg-purple-900/30 border-purple-500/50'
                            : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/30'
                            }`}
                    >
                        <div className="text-4xl mb-3">{region.emoji}</div>
                        <div className="font-medium text-white">{region.name}</div>
                        <div className="text-xs text-gray-400 mt-1">
                            {region.id === 'eu' && 'Europe, Middle East'}
                            {region.id === 'na' && 'North America'}
                            {region.id === 'latam' && 'Latin America'}
                            {region.id === 'asia' && 'Asia Pacific'}
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
