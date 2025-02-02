PGDMP     
        
            {            d7sbk3tut9ljfj     15.3 (Ubuntu 15.3-1.pgdg20.04+1)    15.2 H    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            /           1262    37647021    d7sbk3tut9ljfj    DATABASE     z   CREATE DATABASE d7sbk3tut9ljfj WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE d7sbk3tut9ljfj;
                bzriyeharqkoxe    false            0           0    0    DATABASE d7sbk3tut9ljfj    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE d7sbk3tut9ljfj FROM PUBLIC;
                   bzriyeharqkoxe    false    4399            1           0    0    d7sbk3tut9ljfj    DATABASE PROPERTIES     R   ALTER DATABASE d7sbk3tut9ljfj SET search_path TO '$user', 'public', 'heroku_ext';
                     bzriyeharqkoxe    false                        2615    37647022 
   heroku_ext    SCHEMA        CREATE SCHEMA heroku_ext;
    DROP SCHEMA heroku_ext;
                u31pqc63d7nmel    false            2           0    0    SCHEMA heroku_ext    ACL     4   GRANT USAGE ON SCHEMA heroku_ext TO bzriyeharqkoxe;
                   u31pqc63d7nmel    false    7                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                bzriyeharqkoxe    false            3           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO bzriyeharqkoxe;
                   postgres    false    884                        3079    37647023    pg_stat_statements 	   EXTENSION     J   CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA heroku_ext;
 #   DROP EXTENSION pg_stat_statements;
                   false    7            4           0    0    EXTENSION pg_stat_statements    COMMENT     u   COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';
                        false    2            �            1259    37688477    conversations    TABLE     ~   CREATE TABLE public.conversations (
    conversation_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL
);
 !   DROP TABLE public.conversations;
       public         heap    bzriyeharqkoxe    false    6            �            1259    37688480 !   Conversations_conversation_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Conversations_conversation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."Conversations_conversation_id_seq";
       public          bzriyeharqkoxe    false    218    6            5           0    0 !   Conversations_conversation_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Conversations_conversation_id_seq" OWNED BY public.conversations.conversation_id;
          public          bzriyeharqkoxe    false    219            �            1259    37688483    messages    TABLE     �   CREATE TABLE public.messages (
    message_id integer NOT NULL,
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL
);
    DROP TABLE public.messages;
       public         heap    bzriyeharqkoxe    false    6            �            1259    37688489    Messages_message_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Messages_message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Messages_message_id_seq";
       public          bzriyeharqkoxe    false    6    220            6           0    0    Messages_message_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Messages_message_id_seq" OWNED BY public.messages.message_id;
          public          bzriyeharqkoxe    false    221            �            1259    37688490    participants    TABLE     �   CREATE TABLE public.participants (
    participant_id integer NOT NULL,
    user_id integer NOT NULL,
    conversation_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL
);
     DROP TABLE public.participants;
       public         heap    bzriyeharqkoxe    false    6            �            1259    37688494    Participants_participant_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Participants_participant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Participants_participant_id_seq";
       public          bzriyeharqkoxe    false    222    6            7           0    0    Participants_participant_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Participants_participant_id_seq" OWNED BY public.participants.participant_id;
          public          bzriyeharqkoxe    false    223            �            1259    37688495    receipts    TABLE     �   CREATE TABLE public.receipts (
    receipt_id integer NOT NULL,
    message_id integer NOT NULL,
    user_id integer NOT NULL,
    is_read boolean NOT NULL,
    created_at timestamp with time zone NOT NULL
);
    DROP TABLE public.receipts;
       public         heap    bzriyeharqkoxe    false    6            �            1259    37688499    Receipts_receipt_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Receipts_receipt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Receipts_receipt_id_seq";
       public          bzriyeharqkoxe    false    224    6            8           0    0    Receipts_receipt_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Receipts_receipt_id_seq" OWNED BY public.receipts.receipt_id;
          public          bzriyeharqkoxe    false    225            �            1259    37688500    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    gender boolean,
    birthday date NOT NULL,
    address text,
    telephone character varying(12),
    avatar text,
    status character varying(20) NOT NULL,
    is_admin boolean NOT NULL
);
    DROP TABLE public.users;
       public         heap    bzriyeharqkoxe    false    6            �            1259    37688508    Users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Users_user_id_seq";
       public          bzriyeharqkoxe    false    6    226            9           0    0    Users_user_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Users_user_id_seq" OWNED BY public.users.user_id;
          public          bzriyeharqkoxe    false    227            �            1259    37688511    friend_requests    TABLE     �   CREATE TABLE public.friend_requests (
    request_id integer NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    message text NOT NULL
);
 #   DROP TABLE public.friend_requests;
       public         heap    bzriyeharqkoxe    false    6            �            1259    37688516    friend_requests_request_id_seq    SEQUENCE     �   CREATE SEQUENCE public.friend_requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.friend_requests_request_id_seq;
       public          bzriyeharqkoxe    false    228    6            :           0    0    friend_requests_request_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.friend_requests_request_id_seq OWNED BY public.friend_requests.request_id;
          public          bzriyeharqkoxe    false    229            �            1259    37688519    friendships    TABLE     �   CREATE TABLE public.friendships (
    friendship_id integer NOT NULL,
    user_id integer NOT NULL,
    friend_id integer NOT NULL
);
    DROP TABLE public.friendships;
       public         heap    bzriyeharqkoxe    false    6            �            1259    37688523    friendships_friendship_id_seq    SEQUENCE     �   CREATE SEQUENCE public.friendships_friendship_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.friendships_friendship_id_seq;
       public          bzriyeharqkoxe    false    6    230            ;           0    0    friendships_friendship_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.friendships_friendship_id_seq OWNED BY public.friendships.friendship_id;
          public          bzriyeharqkoxe    false    231            k           2604    37688525    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public."Conversations_conversation_id_seq"'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          bzriyeharqkoxe    false    219    218            p           2604    37688526    friend_requests request_id    DEFAULT     �   ALTER TABLE ONLY public.friend_requests ALTER COLUMN request_id SET DEFAULT nextval('public.friend_requests_request_id_seq'::regclass);
 I   ALTER TABLE public.friend_requests ALTER COLUMN request_id DROP DEFAULT;
       public          bzriyeharqkoxe    false    229    228            q           2604    37688528    friendships friendship_id    DEFAULT     �   ALTER TABLE ONLY public.friendships ALTER COLUMN friendship_id SET DEFAULT nextval('public.friendships_friendship_id_seq'::regclass);
 H   ALTER TABLE public.friendships ALTER COLUMN friendship_id DROP DEFAULT;
       public          bzriyeharqkoxe    false    231    230            l           2604    37688531    messages message_id    DEFAULT     |   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public."Messages_message_id_seq"'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          bzriyeharqkoxe    false    221    220            m           2604    37688532    participants participant_id    DEFAULT     �   ALTER TABLE ONLY public.participants ALTER COLUMN participant_id SET DEFAULT nextval('public."Participants_participant_id_seq"'::regclass);
 J   ALTER TABLE public.participants ALTER COLUMN participant_id DROP DEFAULT;
       public          bzriyeharqkoxe    false    223    222            n           2604    37688534    receipts receipt_id    DEFAULT     |   ALTER TABLE ONLY public.receipts ALTER COLUMN receipt_id SET DEFAULT nextval('public."Receipts_receipt_id_seq"'::regclass);
 B   ALTER TABLE public.receipts ALTER COLUMN receipt_id DROP DEFAULT;
       public          bzriyeharqkoxe    false    225    224            o           2604    37688535    users user_id    DEFAULT     p   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public."Users_user_id_seq"'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          bzriyeharqkoxe    false    227    226                      0    37688477    conversations 
   TABLE DATA           D   COPY public.conversations (conversation_id, created_at) FROM stdin;
    public          bzriyeharqkoxe    false    218   �Y       &          0    37688511    friend_requests 
   TABLE DATA           V   COPY public.friend_requests (request_id, sender_id, receiver_id, message) FROM stdin;
    public          bzriyeharqkoxe    false    228   �Y       (          0    37688519    friendships 
   TABLE DATA           H   COPY public.friendships (friendship_id, user_id, friend_id) FROM stdin;
    public          bzriyeharqkoxe    false    230   
Z                 0    37688483    messages 
   TABLE DATA           _   COPY public.messages (message_id, conversation_id, sender_id, content, created_at) FROM stdin;
    public          bzriyeharqkoxe    false    220   AZ                  0    37688490    participants 
   TABLE DATA           \   COPY public.participants (participant_id, user_id, conversation_id, created_at) FROM stdin;
    public          bzriyeharqkoxe    false    222   ^Z       "          0    37688495    receipts 
   TABLE DATA           X   COPY public.receipts (receipt_id, message_id, user_id, is_read, created_at) FROM stdin;
    public          bzriyeharqkoxe    false    224   {Z       $          0    37688500    users 
   TABLE DATA           �   COPY public.users (user_id, username, password, email, first_name, last_name, gender, birthday, address, telephone, avatar, status, is_admin) FROM stdin;
    public          bzriyeharqkoxe    false    226   �Z       <           0    0 !   Conversations_conversation_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Conversations_conversation_id_seq"', 22, true);
          public          bzriyeharqkoxe    false    219            =           0    0    Messages_message_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Messages_message_id_seq"', 62, true);
          public          bzriyeharqkoxe    false    221            >           0    0    Participants_participant_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Participants_participant_id_seq"', 35, true);
          public          bzriyeharqkoxe    false    223            ?           0    0    Receipts_receipt_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Receipts_receipt_id_seq"', 40, true);
          public          bzriyeharqkoxe    false    225            @           0    0    Users_user_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Users_user_id_seq"', 59, true);
          public          bzriyeharqkoxe    false    227            A           0    0    friend_requests_request_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.friend_requests_request_id_seq', 63, true);
          public          bzriyeharqkoxe    false    229            B           0    0    friendships_friendship_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.friendships_friendship_id_seq', 42, true);
          public          bzriyeharqkoxe    false    231            s           2606    37688548     conversations Conversations_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT "Conversations_pkey" PRIMARY KEY (conversation_id);
 L   ALTER TABLE ONLY public.conversations DROP CONSTRAINT "Conversations_pkey";
       public            bzriyeharqkoxe    false    218            u           2606    37688550    messages Messages_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (message_id);
 B   ALTER TABLE ONLY public.messages DROP CONSTRAINT "Messages_pkey";
       public            bzriyeharqkoxe    false    220            w           2606    37688552    participants Participants_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "Participants_pkey" PRIMARY KEY (participant_id);
 J   ALTER TABLE ONLY public.participants DROP CONSTRAINT "Participants_pkey";
       public            bzriyeharqkoxe    false    222            y           2606    37688554    receipts Receipts_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT "Receipts_pkey" PRIMARY KEY (receipt_id);
 B   ALTER TABLE ONLY public.receipts DROP CONSTRAINT "Receipts_pkey";
       public            bzriyeharqkoxe    false    224            {           2606    37688556    users Users_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT "Users_pkey";
       public            bzriyeharqkoxe    false    226                       2606    37688558 $   friend_requests friend_requests_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_pkey PRIMARY KEY (request_id);
 N   ALTER TABLE ONLY public.friend_requests DROP CONSTRAINT friend_requests_pkey;
       public            bzriyeharqkoxe    false    228            �           2606    37688560    friendships friendships_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_pkey PRIMARY KEY (friendship_id);
 F   ALTER TABLE ONLY public.friendships DROP CONSTRAINT friendships_pkey;
       public            bzriyeharqkoxe    false    230            }           2606    37688565    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            bzriyeharqkoxe    false    226            �           2606    37688566 &   messages Messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "Messages_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.messages DROP CONSTRAINT "Messages_conversation_id_fkey";
       public          bzriyeharqkoxe    false    218    220    4211            �           2606    37688571     messages Messages_sender_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "Messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.messages DROP CONSTRAINT "Messages_sender_id_fkey";
       public          bzriyeharqkoxe    false    4219    220    226            �           2606    37688576 .   participants Participants_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "Participants_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.participants DROP CONSTRAINT "Participants_conversation_id_fkey";
       public          bzriyeharqkoxe    false    4211    222    218            �           2606    37688582 &   participants Participants_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "Participants_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.participants DROP CONSTRAINT "Participants_user_id_fkey";
       public          bzriyeharqkoxe    false    222    226    4219            �           2606    37688588 !   receipts Receipts_message_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT "Receipts_message_id_fkey" FOREIGN KEY (message_id) REFERENCES public.messages(message_id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.receipts DROP CONSTRAINT "Receipts_message_id_fkey";
       public          bzriyeharqkoxe    false    220    224    4213            �           2606    37688593    receipts Receipts_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT "Receipts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.receipts DROP CONSTRAINT "Receipts_user_id_fkey";
       public          bzriyeharqkoxe    false    224    226    4219            �           2606    37688598 0   friend_requests friend_requests_receiver_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.friend_requests DROP CONSTRAINT friend_requests_receiver_id_fkey;
       public          bzriyeharqkoxe    false    4219    228    226            �           2606    37688604 .   friend_requests friend_requests_sender_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.friend_requests DROP CONSTRAINT friend_requests_sender_id_fkey;
       public          bzriyeharqkoxe    false    4219    228    226            �           2606    37688611 &   friendships friendships_friend_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.friendships DROP CONSTRAINT friendships_friend_id_fkey;
       public          bzriyeharqkoxe    false    4219    230    226            �           2606    37688616 $   friendships friendships_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.friendships DROP CONSTRAINT friendships_user_id_fkey;
       public          bzriyeharqkoxe    false    4219    230    226                  x������ � �      &      x������ � �      (   '   x�3��45�4��21 �@6��!�a�eb$AR1z\\\ ��            x������ � �             x������ � �      "      x������ � �      $   �  x���K��0��9ph�%8�Q��^A�&T�2�q�	�F�~�.��B����F�of��s~f���}��C[�m�A����
�ٳ��*]?8�|���C��;���a'���ƿa�q%Tz���Ɇre!��w�/�i�ï@ �D� $BT��n���TV��DeM/��r������`@�P������D����k�W�~�6QU�$J�1|�m�C &"�R����,1gȂ�� ����X��m���ŝ�إ�ԛ�2ȥf�1[�B�m"�QS����gV��t�,n��H6�F�SF:�+S�'9߯�u��ɡ��Ș�28�;��Ah�?c�����`�
ELw)�gUMvH�՜f+:_-����l�1J�C0���XN�?����X�w�����5�Wr�����<Q�)�O�s%LJ���������'�C&�E}�w���h������Y3>��e�I��~��V�7���     