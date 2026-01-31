'use client';
import React, { useState, useEffect } from 'react';
import { Waves, Wind, Leaf, Sparkles, LucideIcon } from 'lucide-react';

type ViewType = 'short' | 'full' | 'meditate';

const ExtendedSerenityPrayer = () => {
    const [activeView, setActiveView] = useState<ViewType>('full');
    const [breathingPhase, setBreathingPhase] = useState('inhale');

    useEffect(() => {
        const breathingCycle = setInterval(() => {
            setBreathingPhase(prev => {
                if (prev === 'inhale') return 'hold';
                if (prev === 'hold') return 'exhale';
                return 'inhale';
            });
        }, 4000);
        return () => clearInterval(breathingCycle);
    }, []);

    const prayerLines = [
        { text: 'God, grant me the serenity', icon: Waves, theme: 'peace' },
        { text: 'to accept the things I cannot change,', icon: Leaf, theme: 'acceptance' },
        { text: 'courage to change the things I can,', icon: Sparkles, theme: 'courage' },
        { text: 'and wisdom to know the difference.', icon: Wind, theme: 'wisdom' },
    ];

    const extendedLines = [
        'Living one day at a time,', 'enjoying one moment at a time,',
        'accepting hardships as the pathway to peace;',
        'taking, as He did, this sinful world as it is,', 'not as I would have it;',
        'trusting that He will make all things right', 'if I surrender to His will;',
        'that I may be reasonably happy in this life',
        'and supremely happy with Him forever in the next.'
    ];

    const themes: any = {
        peace: { color: '#7ec8e3', bg: 'rgba(126, 200, 227, 0.08)' },
        acceptance: { color: '#88c999', bg: 'rgba(136, 201, 153, 0.08)' },
        courage: { color: '#f4a261', bg: 'rgba(244, 162, 97, 0.08)' },
        wisdom: { color: '#b491c8', bg: 'rgba(180, 145, 200, 0.08)' }
    };

    // The minimal logic fix for the button hover/style errors
    const getButtonStyle = (view: ViewType): React.CSSProperties => ({
        padding: '8px 16px',
        background: activeView === view ? 'rgba(126, 200, 227, 0.2)' : 'rgba(255, 255, 255, 0.5)',
        border: '1px solid',
        borderColor: activeView === view ? 'rgba(126, 200, 227, 0.5)' : 'rgba(126, 200, 227, 0.15)',
        cursor: 'pointer'
    });

    return (
        <div style={{ padding: '20px' }}>
            {/* The Nav Bar: Now with the spacer to fix the Meditate position */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setActiveView('short')} style={getButtonStyle('short')}>Short</button>
                <button onClick={() => setActiveView('full')} style={getButtonStyle('full')}>Full</button>
                <div style={{ flex: 1 }} />
                <button onClick={() => setActiveView('meditate')} style={getButtonStyle('meditate')}>Meditate</button>
            </div>

            {activeView === 'meditate' ? (
                <div style={{ textAlign: 'center', fontSize: '2rem', marginTop: '50px' }}>
                    {breathingPhase.toUpperCase()}
                </div>
            ) : (
                <div>
                    {prayerLines.map((line, i) => {
                        const Icon = line.icon;
                        return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: themes[line.theme].color, marginBottom: '10px' }}>
                                <Icon size={20} />
                                <span>{line.text}</span>
                            </div>
                        );
                    })}

                    {activeView === 'full' && (
                        <div style={{ marginTop: '15px' }}>
                            {extendedLines.map((text, i) => (
                                <p key={i} style={{ margin: '5px 0' }}>{text}</p>
                            ))}
                            <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#999' }}>— Reinhold Niebuhr</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExtendedSerenityPrayer;