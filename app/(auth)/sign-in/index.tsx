import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { useRouter } from "expo-router";


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
      router.back();
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#070A12]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* خلفية Blur/Glow خفيفة */}
      <View className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <View className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-5 py-6">
          <MotiView
            from={{ opacity: 0, translateY: 22 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
            className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl"
          >
            {/* Header */}
            <MotiView
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 450, delay: 60 }}
            >
              <Text className="text-2xl font-extrabold text-white">
                Create account
              </Text>
              <Text className="mt-1 text-white/65">
                Sign up in a few seconds
              </Text>
            </MotiView>

            {/* Divider */}
            <View className="my-4 h-px bg-white/10" />

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
            <View className="mt-5">
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
                    className="overflow-hidden rounded-2xl"
                  >
                    {/* زر بجراديانت وهمي (Layer) */}
                    <View className="absolute inset-0 bg-white" />
                    <View className="absolute inset-0 bg-indigo-500/15" />

                    <View className="flex-row items-center justify-center py-4">
                      <AnimatePresence>
                        {loading ? (
                          <MotiView
                            key="spinner"
                            from={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "timing", duration: 150 }}
                            className="mr-2 h-4 w-4 rounded-full border-2 border-slate-900/30 border-t-slate-900"
                            style={{ transform: [{ rotate: "45deg" }] }}
                          />
                        ) : null}
                      </AnimatePresence>

                      <Text className="text-base font-extrabold text-slate-950">
                        {loading ? "Creating..." : "Sign up"}
                      </Text>
                    </View>
                  </MotiView>
                )}
              </Pressable>

              <Pressable onPress={() => router.replace("/(auth)/sign-up")} className="mt-3">
                {({ pressed }) => (
                  <MotiView
                    animate={{ opacity: pressed ? 0.7 : 1 }}
                    transition={{ type: "timing", duration: 120 }}
                    className="items-center py-2"
                  >
                    <Text className="text-white/75 underline">
                     Don't have an account? Go to Sign up
                    </Text>
                  </MotiView>
                )}
              </Pressable>

              <Text className="mt-1 text-center text-xs text-white/40">
                Password must be at least 6 characters.
              </Text>
            </View>
          </MotiView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
      className="mt-3"
    >
      <Text className="mb-2 text-[13px] font-semibold text-white/80">
        {label}
      </Text>

      <MotiView
        animate={{
          borderColor: focused ? "rgba(99,102,241,0.8)" : "rgba(255,255,255,0.10)",
          backgroundColor: focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
        }}
        transition={{ type: "timing", duration: 160 }}
        className="rounded-2xl border px-4 py-3"
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          className="text-[15px] text-white"
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
            className="mt-2 h-1 rounded-full bg-indigo-400/40"
          />
        ) : null}
      </AnimatePresence>
    </MotiView>
  );
}