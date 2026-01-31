'use client';
import React, { useState, useEffect } from 'react';
import { Waves, Wind, Leaf, Sparkles, LucideIcon } from 'lucide-react';

// Type definitions to keep the Next.js compiler happy
type ViewType = 'short' | 'full' | 'meditate';
type ThemeKey = 'peace' | 'acceptance' | 'courage' | 'wisdom';

interface PrayerLine {
    text: string;
    Icon: LucideIcon;
    theme: ThemeKey;
}

const ExtendedSerenityPrayer = () => {
    const [activeView, setActiveView] = useState<ViewType>('full');
    const [hoveredView, setHoveredView] = useState<string>('');
    const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

    // Breathing logic cycle (4 seconds per phase)
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

    const prayerLines: PrayerLine[] = [
        { text: 'God, grant me the serenity', Icon: Waves, theme: 'peace' },
        { text: 'to accept the things I cannot change,', Icon: Leaf, theme: 'acceptance' },
        { text: 'courage to change the things I can,', Icon: Sparkles, theme: 'courage' },
        { text: 'and wisdom to know the difference.', Icon: Wind, theme: 'wisdom' },
    ];

    const extendedLines = [
        'Living one day at a time,',
        'enjoying one moment at a time,',
        'accepting hardships as the pathway to peace;',
        'taking, as He did, this sinful world as it is,',
        'not as I would have it;',
        'trusting that He will make all things right',
        'if I surrender to His will;',
        'that I may be reasonably happy in this life',
        'and supremely happy with Him forever in the next.'
    ];

    const themes: Record<ThemeKey, { color: string; bg: string }> = {
        peace: { color: '#7ec8e3', bg: 'rgba(126, 200, 227, 0.08)' },
        acceptance: { color: '#88c999', bg: 'rgba(136, 201, 153, 0.08)' },
        courage: { color: '#f4a261', bg: 'rgba(244, 162, 97, 0.08)' },
        wisdom: { color: '#b491c8', bg: 'rgba(180, 145, 200, 0.08)' }
    };

    const getButtonStyle = (view: ViewType): React.CSSProperties => {
        const isActive = activeView === view;
        const isHovered = hoveredView === view;

        // Meditate uses the Wisdom (purple) theme, others use Peace (blue)
        const activeColor = view === 'meditate' ? themes.wisdom.color : themes.peace.color;

        return {
            background: isActive ? activeColor : (isHovered ? `${activeColor}11` : 'rgba(255, 255, 255, 0.5)'),
            borderColor: isActive ? activeColor : (isHovered ? `${activeColor}44` : 'rgba(0, 0, 0, 0.1)'),
            color: isActive ? 'white' : '#555',
            padding: '10px 24px',
            border: '1px solid',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '500',
            outline: 'none'
        };
    };

    return (
        <div style={{ maxWidth: '700px', margin: '60px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>

            {/* Navigation Tabs */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px' }}>
                {(['short', 'full'] as ViewType[]).map((v) => (
                    <button
                        key={v}
                        onClick={() => setActiveView(v)}
                        onMouseEnter={() => setHoveredView(v)}
                        onMouseLeave={() => setHoveredView('')}
                        style={getButtonStyle(v)}
                    >
                        {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                ))}

                {/* The Spacer that shoves Meditate to the right */}
                <div style={{ flex: 1 }} />

                <button
                    onClick={() => setActiveView('meditate')}
                    onMouseEnter={() => setHoveredView('meditate')}
                    onMouseLeave={() => setHoveredView('')}
                    style={getButtonStyle('meditate')}
                >
                    Meditate
                </button>
            </nav>

            {/* Content Area */}
            <main style={{ minHeight: '450px' }}>
                {activeView === 'meditate' ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            fontSize: '4.5rem',
                            fontWeight: '700',
                            color: themes.wisdom.color,
                            transition: 'all 4000ms ease-in-out', // Smooth transition matching interval
                            transform: breathingPhase === 'inhale' ? 'scale(1.2)' : 'scale(0.95)',
                            opacity: breathingPhase === 'hold' ? 0.6 : 1,
                            letterSpacing: '0.1rem'
                        }}>
                            {breathingPhase.toUpperCase()}
                        </div>
                        <p style={{ marginTop: '40px', color: '#999', fontSize: '1.2rem', fontStyle: 'italic' }}>
                            "Be still, and know..."
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {prayerLines.map((line, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '24px',
                                borderRadius: '16px',
                                backgroundColor: themes[line.theme].bg,
                                color: themes[line.theme].color,
                                border: `1px solid ${themes[line.theme].color}15`,
                                transition: 'transform 0.2s ease'
                            }}>
                                <line.Icon size={32} strokeWidth={1.5} />
                                <span style={{ fontSize: '1.4rem', fontWeight: '500' }}>{line.text}</span>
                            </div>
                        ))}

                        {activeView === 'full' && (
                            <div style={{
                                marginTop: '20px',
                                paddingLeft: '56px',
                                borderLeft: '2px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                                animation: 'fadeIn 0.5s ease-out'
                            }}>
                                {extendedLines.map((text, i) => (
                                    <p key={i} style={{ color: '#666', fontSize: '1.15rem', margin: 0, lineHeight: '1.6' }}>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Global Keyframes for the "Full View" fade-in */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ExtendedSerenityPrayer;