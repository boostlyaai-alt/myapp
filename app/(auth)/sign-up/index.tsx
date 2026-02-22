import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";


type FormState = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canSubmit = useMemo(() => {
    const { name, username, email, password } = form;
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim())
      return false;
    if (!isValidEmail(email)) return false;
    if (password.trim().length < 6) return false;
    return true;
  }, [form]);

  const onChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      Alert.alert("Success", "Account created!");
      router.replace("/dashboard");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* خلفية Blur/Glow خفيفة */}
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <MotiView
            from={{ opacity: 0, translateY: 22 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
            style={styles.card}
          >
            {/* Header */}
            <MotiView
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 450, delay: 60 }}
            >
              <Text style={styles.title}>
                Create account
              </Text>
              <Text style={styles.subtitle}>
                Sign up in a few seconds
              </Text>
            </MotiView>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Staggered fields */}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "timing",
                duration: 250,
                delay: 120,
              }}
            >
              <AnimatedField
                i={0}
                label="Name"
                placeholder="John Doe"
                value={form.name}
                onChangeText={(v) => onChange("name", v)}
              />
              <AnimatedField
                i={1}
                label="Username"
                placeholder="johnny"
                value={form.username}
                onChangeText={(v) => onChange("username", v)}
                autoCapitalize="none"
              />
              <AnimatedField
                i={2}
                label="Email"
                placeholder="john@example.com"
                value={form.email}
                onChangeText={(v) => onChange("email", v)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AnimatedField
                i={3}
                label="Password"
                placeholder="••••••••"
                value={form.password}
                onChangeText={(v) => onChange("password", v)}
                secureTextEntry
              />
            </MotiView>

            {/* CTA */}
            <View style={styles.cta}>
              <Pressable
                onPress={handleSubmit}
                disabled={!canSubmit || loading}
              >
                {({ pressed }) => (
                  <MotiView
                    animate={{
                      opacity: !canSubmit || loading ? 0.5 : 1,
                      scale: pressed && canSubmit && !loading ? 0.98 : 1,
                    }}
                    transition={{ type: "timing", duration: 120 }}
                    style={styles.buttonContainer}
                  >
                    {/* زر بجراديانت وهمي (Layer) */}
                    <View style={styles.buttonBg1} />
                    <View style={styles.buttonBg2} />

                    <View style={styles.buttonContent}>
                      <AnimatePresence>
                        {loading ? (
                          <MotiView
                            key="spinner"
                            from={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "timing", duration: 150 }}
                            style={styles.spinner}
                          />
                        ) : null}
                      </AnimatePresence>

                      <Text style={styles.buttonText}>
                        {loading ? "Creating..." : "Sign up"}
                      </Text>
                    </View>
                  </MotiView>
                )}
              </Pressable>

              <Pressable onPress={() => router.back()} style={styles.backButton}>
                {({ pressed }) => (
                  <MotiView
                    animate={{ opacity: pressed ? 0.7 : 1 }}
                    transition={{ type: "timing", duration: 120 }}
                    style={styles.backButtonContent}
                  >
                    <Text style={styles.backText}>
                      Already have an account? Go back
                    </Text>
                  </MotiView>
                )}
              </Pressable>

              <Text style={styles.hint}>
                Password must be at least 6 characters.
              </Text>
            </View>
          </MotiView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A12',
  },
  glow1: {
    position: 'absolute',
    top: -96,
    right: -96,
    height: 288,
    width: 288,
    borderRadius: 144,
    backgroundColor: 'rgba(99,102,241,0.2)',
    // blur not supported in RN, perhaps use a library or skip
  },
  glow2: {
    position: 'absolute',
    bottom: -96,
    left: -96,
    height: 288,
    width: 288,
    borderRadius: 144,
    backgroundColor: 'rgba(232,121,249,0.15)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(15,23,42,0.8)',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },
  subtitle: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.65)',
  },
  divider: {
    marginVertical: 16,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cta: {
    marginTop: 20,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  buttonBg1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  buttonBg2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(99,102,241,0.15)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  spinner: {
    marginRight: 8,
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(15,23,42,0.3)',
    borderTopColor: '#0f172a',
    transform: [{ rotate: '45deg' }],
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  backButton: {
    marginTop: 12,
  },
  backButtonContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backText: {
    color: 'rgba(255,255,255,0.75)',
    textDecorationLine: 'underline',
  },
  hint: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
  fieldContainer: {
    marginTop: 12,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  fieldInputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fieldInput: {
    fontSize: 15,
    color: 'white',
  },
  fieldGlow: {
    marginTop: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(99,102,241,0.4)',
  },
});

function AnimatedField(props: {
  i: number;
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  const {
    i,
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
  } = props;

  const [focused, setFocused] = useState(false);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 380,
        delay: 140 + i * 70, // Stagger
      }}
      style={styles.fieldContainer}
    >
      <Text style={styles.fieldLabel}>
        {label}
      </Text>

      <MotiView
        animate={{
          borderColor: focused ? "rgba(99,102,241,0.8)" : "rgba(255,255,255,0.10)",
          backgroundColor: focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
        }}
        transition={{ type: "timing", duration: 160 }}
        style={styles.fieldInputContainer}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          style={styles.fieldInput}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? "sentences"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </MotiView>

      {/* Glow صغيرة تحت الحقل أثناء الفوكس */}
      <AnimatePresence>
        {focused ? (
          <MotiView
            key="glow"
            from={{ opacity: 0, scaleX: 0.9 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.9 }}
            transition={{ type: "timing", duration: 180 }}
            style={styles.fieldGlow}
          />
        ) : null}
      </AnimatePresence>
    </MotiView>
  );
}